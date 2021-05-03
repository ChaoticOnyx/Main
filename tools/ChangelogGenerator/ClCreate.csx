#nullable enable
#load "Settings.csx"
#load "Models.csx"

using System.Globalization;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;

// Получение переменных среды.
var githubRepository = Environment.GetEnvironmentVariable("GITHUB_REPOSITORY")
                       ?? throw new InvalidOperationException("🚫 Переменная среды GITHUB_REPOSITORY не найдена.");

// Настройка HTTP клиента
var client = new HttpClient();
client.DefaultRequestHeaders.UserAgent.ParseAdd("PostmanRuntime/7.28.0");
client.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github.groot-preview+json");
var page = 0;
var lastClosedPrDate = DateTime.Parse(File.ReadAllLines(Settings.LastClosedPrDateFile)[0], CultureInfo.InvariantCulture);
var newLastClosedPrDate = lastClosedPrDate;

// Парсинг PR.
while (true)
{
    page++;
    var response = await client.GetAsync($"https://api.github.com/search/issues?q=repo:{githubRepository} is:pr is:merged&order=desc&per_page=100&sort=created&page={page}");
    var searchResponse = await response.Content.ReadFromJsonAsync<Github.Search<Github.PullRequest>>(Settings.JsonOptions)
                         ?? throw new InvalidOperationException("🚫 Невозможно распарсить ответ от Github.");

    if (searchResponse.Items.Count == 0)
    {
        WriteLine("✅ Больше PR не обнаружено.");
        File.WriteAllText(Settings.LastClosedPrDateFile, newLastClosedPrDate.ToString(CultureInfo.InvariantCulture));

        return 0;
    }

    foreach (var pullRequest in searchResponse.Items)
    {
        if (pullRequest.Closed is null)
        {
            continue;
        }

        if (pullRequest.Closed > newLastClosedPrDate)
        {
            newLastClosedPrDate = (DateTime)pullRequest.Closed;
        }

        if (pullRequest.Closed <= lastClosedPrDate)
        {
            WriteLine("✅ Больше PR не обнаружено.");
            File.WriteAllText(Settings.LastClosedPrDateFile, newLastClosedPrDate.ToString(CultureInfo.InvariantCulture));

            return 0;
        }

        // Парсинг ченйджлога.
        try
        {
            Changelog changelog = pullRequest.ParseChangelog();
            var changelogPath = Path.GetFullPath($"PR-{pullRequest.Number}.json", Settings.ChangelogsFolder);
            File.WriteAllText(changelogPath, JsonSerializer.Serialize(changelog, Settings.JsonOptions));
            WriteLine($"✅ Чейнджлог PR #{pullRequest.Number} сохранён.");
        }
        catch (Exception e)
        {
            WriteLine($"🚫 Исключение при парсинге PR #{pullRequest.Number}:\n\t{e.Message}");
        }
    }

    // Задержка для ограничения запросов.
    Thread.Sleep(TimeSpan.FromSeconds(7));
}

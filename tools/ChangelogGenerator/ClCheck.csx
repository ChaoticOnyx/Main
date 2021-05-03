#nullable enable
#load "Settings.csx"
#load "Models.csx"

using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Console = System.Console;

// Получение переменных среды.
var githubRepository = Environment.GetEnvironmentVariable("GITHUB_REPOSITORY")
                       ?? throw new InvalidOperationException("🚫 Переменная среды GITHUB_REPOSITORY не найдена.");
var token = Environment.GetEnvironmentVariable("TOKEN")
                ?? throw new InvalidOperationException("🚫 Переменная среды TOKEN не найдена.");
var githubEventPath = Environment.GetEnvironmentVariable("GITHUB_EVENT_PATH")
                      ?? throw new InvalidOperationException("🚫 Переменная среды GITHUB_EVENT_PATH не найдена.");

// Настройка HTTP клиента
var client = new HttpClient();
client.DefaultRequestHeaders.UserAgent.ParseAdd("PostmanRuntime/7.28.0");
client.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github.groot-preview+json");
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

// Получение информации о PR
var eventPayaload = JsonSerializer.Deserialize<Github.Event>(File.ReadAllText(githubEventPath), Settings.JsonOptions)
                    ?? throw new InvalidOperationException($"🚫 Невозможно распарсить {githubEventPath}");

var pullRequest = eventPayaload.PullRequest;

if (pullRequest is null)
{
    WriteLine("🚫 PR не обнаружен.");

    return 1;
}

try
{
    var changelog = pullRequest.ParseChangelog();
}
catch (Exception e)
{
    WriteLine($"🚫 Ошибка при парсинге чейнджлога:\n\t{e.Message}");
    var response = await client.PutAsync($"https://api.github.com/repos/{githubRepository}/issues/{pullRequest.Number}/labels", new StringContent($"{{ \"labels\": [\"{Settings.ChangelogRequiredLabel}\"] }}"));
    response.EnsureSuccessStatusCode();

    return 1;
}

WriteLine($"✅ Чейнджлог корректный.");
var response = await client.DeleteAsync($"https://api.github.com/repos/{githubRepository}/issues/{pullRequest.Number}/labels/{Uri.EscapeUriString(Settings.ChangelogRequiredLabel)}");

return 0;

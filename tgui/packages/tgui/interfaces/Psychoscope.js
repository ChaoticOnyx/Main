import { useBackend, useLocalState } from '../backend';
import { Window } from '../layouts';
import {
  Button,
  Section,
  LabeledList,
  Tabs,
  NoticeBox,
  ProgressBar,
  Flex,
  Divider,
} from '../components';
import { logger } from '../logging';

const OpenedNeuromods = (props, context) => {
  const { act, data } = useBackend(context);
  const { state, scan, disk } = props;

  const scanned = data.scanned || [];
  const { inserted_disk } = data;
  let neuromods = [];

  scanned.forEach((scan) => {
    scan.opened_neuromods?.map((neuromod, _) => {
      let res = neuromod;
      res.from = scan.lifeform.species;
      res.fromType = scan.lifeform.type;

      neuromods = neuromods.concat(res);
    });
  });

  if (!neuromods.length) {
    return <NoticeBox>No Opened Neuromods.</NoticeBox>;
  }

  return neuromods.map((neuromod, i) => (
    <>
      <LabeledList>
        <LabeledList.Item label="Name">
          {neuromod.neuromod_name}
        </LabeledList.Item>
        <LabeledList.Item label="Description">
          {neuromod.neuromod_desc}
        </LabeledList.Item>
        <LabeledList.Item label="Source">{neuromod.from}</LabeledList.Item>
        <LabeledList.Item label="Actions">
          <Button
            disabled={inserted_disk !== 'neuromod'}
            icon="save"
            content="Save to Disk"
            onClick={() =>
              act('saveNeuromodToDisk', {
                lifeform_type: neuromod.fromType,
                neuromod_type: neuromod.neuromod_type,
              })}
          />
        </LabeledList.Item>
      </LabeledList>
      {i !== neuromods.length - 1 ? <Divider /> : null}
    </>
  ));
};

const OpenedTechnologies = (props, context) => {
  const { act, data } = useBackend(context);
  const scanned = data.scanned || [];
  const { inserted_disk } = data;
  let techs = [];

  scanned.forEach((scan) => {
    scan.opened_techs?.map((tech, _) => {
      let res = tech;
      res.from = scan.lifeform.species;
      res.fromType = scan.lifeform.type;

      techs = techs.concat(res);
    });
  });

  if (!techs.length) {
    return <NoticeBox>No opened technologies.</NoticeBox>;
  }

  return techs.map((tech, i) => (
    <>
      <LabeledList>
        <LabeledList.Item label="Name">{tech.tech_name}</LabeledList.Item>
        <LabeledList.Item label="Level">{tech.tech_level}</LabeledList.Item>
        <LabeledList.Item label="Source">{tech.from}</LabeledList.Item>
        <LabeledList.Item label="Actions">
          <Button
            icon="save"
            content="Save to Disk"
            disabled={inserted_disk !== 'tech'}
            onClick={() =>
              act('saveTechToDisk', {
                lifeform_type: tech.fromType,
                tech_id: tech.tech_id,
                tech_level: tech.tech_level,
              })}
          />
        </LabeledList.Item>
      </LabeledList>
      {i !== techs.length - 1 ? <Divider /> : null}
    </>
  ));
};

const ScanReport = (props, context) => {
  const { act, data } = useBackend(context);
  const { scans_journal } = props.lifeformData;

  if (!scans_journal) {
    return <NoticeBox>No Scans</NoticeBox>;
  }

  return scans_journal.map((scan, i) => {
    return (
      <>
        <LabeledList>
          <LabeledList.Item label="Date">{scan.date}</LabeledList.Item>
          <LabeledList.Item label="Object Name">{scan.name}</LabeledList.Item>
        </LabeledList>
        {i !== scans_journal.length - 1 ? <Divider /> : null}
      </>
    );
  });
};

export const Lifeform = (props, context) => {
  const showScanHistory = props.showScanHistory || false;
  const { children } = props;
  const { scan_count } = props.lifeformData;
  const lifeform = props.lifeformData.lifeform || props.lifeformData;

  return (
    <>
      <LabeledList>
        <LabeledList.Item label="Kingdom">{lifeform.kingdom}</LabeledList.Item>
        <LabeledList.Item label="Class">{lifeform.class}</LabeledList.Item>
        <LabeledList.Item label="Genus">{lifeform.genus}</LabeledList.Item>
        <LabeledList.Item label="Species">{lifeform.species}</LabeledList.Item>
        <LabeledList.Item label="Description">{lifeform.desc}</LabeledList.Item>
        <LabeledList.Item label="Scans Count">{scan_count}</LabeledList.Item>
        {children ? (
          <LabeledList.Item label="Actions">
            {children}
          </LabeledList.Item>
        ) : null}
      </LabeledList>
      {showScanHistory ? (
        <Section title="Scans History">
          <ScanReport lifeformData={props.lifeformData} />
        </Section>
      ) : null}
    </>
  );
};

const LifeformsList = (props, context) => {
  const { act, data } = useBackend(context);
  const { selected_lifeform, scanned } = data;
  const [lifeformTabIndex, setLifeformTabIndex] = useLocalState(
    context,
    'lifeformTabIndex',
    0
  );

  if (!scanned) {
    return <NoticeBox>No Scanned Lifeforms.</NoticeBox>;
  }

  return (
    <Section
      title={`Researched Lifeforms 
      ${data.opened_lifeforms}/${data.total_lifeforms}`}>
      <Flex>
        <Flex.Item>
          <Tabs vertical>
            {scanned.map((scan, i) => (
              <Tabs.Tab
                key={i}
                selected={i === lifeformTabIndex}
                onClick={() => setLifeformTabIndex(i)}>
                {scan.lifeform.species}
              </Tabs.Tab>
            ))}
          </Tabs>
        </Flex.Item>
        <Flex.Item grow={1} ml={2.5}>
          <Section
            title="Lifeform Data"
            buttons={
              <Button
                disabled={data.inserted_disk === 'lifeform' ? false : true}
                content="Save to Disk"
                icon="save"
                onClick={() =>
                  act('saveLifeformToDisk', {
                    lifeform_type: scanned[lifeformTabIndex].lifeform.type,
                  })}
              />
            }>
            <Lifeform
              showScanHistory
              lifeformData={scanned[lifeformTabIndex]}
            />
          </Section>
        </Flex.Item>
      </Flex>
    </Section>
  );
};

const Discoveries = (props, context) => {
  const { act, data } = useBackend(context);

  return (
    <>
      <Section title="Opened Techonologies">
        <OpenedTechnologies />
      </Section>

      <Section title="Opened Neuromods">
        <OpenedNeuromods />
      </Section>
    </>
  );
};

export const Psychoscope = (props, context) => {
  const { act, data } = useBackend(context);
  const { state } = props;
  const [tabIndex, setTabIndex] = useLocalState(context, 'tabIndex', 0);

  const tabs = [
    {
      label: 'Lifeforms List',
      icon: 'list',
      getContent: LifeformsList,
    },
    {
      label: 'Discoveries',
      icon: 'microscope',
      getContent: Discoveries,
    },
  ];

  return (
    <Window width={500} height={600}>
      <Window.Content fitted scrollable>
        <Section
          title="Status"
          buttons={
            <>
              <Button
                icon="lightbulb"
                content="Toggle Psychoscope"
                onClick={() => act('togglePsychoscope')}
                selected={data.status ? true : false}
              />{' '}
              {data.inserted_disk ? (
                <Button
                  icon="eject"
                  content="Eject Disk"
                  onClick={() => act('ejectDisk')}
                />
              ) : (
                <Button
                  icon="eject"
                  content="Insert Disk"
                  onClick={() => act('insertDisk')}
                />
              )}
            </>
          }>
          <LabeledList>
            <LabeledList.Item label="State">
              {data.status ? 'Enabled' : 'Disabled'}
            </LabeledList.Item>
            <LabeledList.Item label="Disk Slot">
              {(data.inserted_disk === 'tech' && 'Technology Disk')
                || (data.inserted_disk === 'neuromod' && 'Neuromod Disk')
                || (data.inserted_disk === 'lifeform' && 'Lifeform Disk')
                || 'Empty'}
            </LabeledList.Item>
            <LabeledList.Item label="Charge">
              {data.charge === null ? (
                <span style={{ color: 'red' }}>No battery cell</span>
              ) : (
                <ProgressBar value={data.charge / data.max_charge} />
              )}
            </LabeledList.Item>
          </LabeledList>
        </Section>
        <Tabs fluid>
          {tabs.map((tab, i) => (
            <Tabs.Tab
              key={i}
              icon={tab.icon}
              selected={i === tabIndex}
              onClick={() => setTabIndex(i)}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs>
        {tabs[tabIndex].getContent(props, context)}
      </Window.Content>
    </Window>
  );
};

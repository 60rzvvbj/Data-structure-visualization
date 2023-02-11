import { getLocationQuery, sleep } from "../../common/utils";
import { WidgetRenderer } from "../../components/widget";
import { modelSwitcher } from "../../core";
import { useUndo } from "../../core/undo";
import { snapshot, useStore } from "../../store";
import { ControlPanel } from "./controlPanel";
import { WidgetPanel } from "./widgetPanel";
import "./index.css";
import { getInitSnapshot } from "../../common/const";
import { Header } from "../../components/header";
import * as projectAPI from "../../net/projectAPI";
import { useCallback, useEffect, useState } from "react";
import { HeaderToolBar, setProjectName } from "./headerToolBar";
import { Snapshot, ProjectInfo, ProjectInfoKey } from "./types";
import { useLocation } from "react-router-dom";
export * from "./types";

function getProjectId(search: string) {
  return getLocationQuery("id", search);
}

async function getProjectData(id: string | null): Promise<ProjectInfo> {
  if (id === null) {
    return {
      id: "",
      account: "",
      name: "",
      snapshot: getInitSnapshot(),
    };
  } else {
    let p = await projectAPI.getProjectInfo(id);
    return {
      id: p.id,
      name: p.name,
      account: p.account,
      snapshot: JSON.parse(p.snapshot),
    };
  }
}

// type MainCanvasProps = {
//   snapshot: Snapshot;
// };

// function MainCanvas(props: MainCanvasProps) {
function MainCanvas() {
  const [data] = useStore(snapshot);

  useUndo();

  return (
    <div className="main">
      {data && (
        <WidgetRenderer model={data.widgetManagerModel}></WidgetRenderer>
      )}
    </div>
  );
}

export function Project() {
  const location = useLocation();
  const id = getProjectId(location.search);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);

  useEffect(() => {
    getProjectData(id).then((info) => {
      setProjectInfo(info);
      modelSwitcher.setModel(info.snapshot);
    });
  }, [id]);

  const change = useCallback((key: ProjectInfoKey, value: any) => {
    if (projectInfo) {
      projectInfo[key] = value;
    }
  }, []);

  return (
    projectInfo && (
      <div className="projectDS">
        <Header
          content={
            <HeaderToolBar info={projectInfo} change={change}></HeaderToolBar>
          }
        ></Header>
        <div className="projectDSContent">
          <WidgetPanel></WidgetPanel>
          {/* <MainCanvas snapshot={projectInfo.snapshot}></MainCanvas> */}
          <MainCanvas></MainCanvas>
          <ControlPanel></ControlPanel>
        </div>
      </div>
    )
  );
}

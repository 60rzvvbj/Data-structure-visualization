import { Header } from "../../components/header";
import { TopMenu } from "../../components/topMenu";
export function AlgorithmCenter() {
  return (
    <div>
      <Header
        content={
          <div className="topMenu">
            <TopMenu></TopMenu>
          </div>
        }
      ></Header>
      <div>Algorithm Center</div>
    </div>
  );
}
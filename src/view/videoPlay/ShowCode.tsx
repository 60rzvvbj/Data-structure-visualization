import { useEffect } from "react";
import { player } from ".";
import { useCodeEditor } from "../algorithmEdit/Editor";
import "./showcode.css";

export function ShowCode(props: { code: string }) {
  const { el: editor, setCode, setHeightLine } = useCodeEditor("show");

  useEffect(() => {
    setCode(props.code);
  }, [props.code, setCode]);

  useEffect(() => {
    player.progress.subscribe(() => {
      setHeightLine(player.getHeightLine());
    });
  });

  return (
    <div className="showCode">
      <div className="title">演示代码</div>
      <div className="content">{editor}</div>
    </div>
  );
}

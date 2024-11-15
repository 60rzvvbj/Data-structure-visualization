import { nav } from "../common/utils";
import { get, post } from "./request";
import { getAccount } from "./token";
import { ResultCode } from "./type";

export interface AlgorithmInfo {
  account: string;
  content: string;
  createTime: string;
  descrition: string;
  id: number;
  modifyTime: string;
  name: string;
  permission: number;
  user: {
    img: string;
    username: string;
  };
}

export interface GetAlgorithmResponseData {
  algorithms: AlgorithmInfo[];
}

export async function createAlgorithm(name: string, content: string, descrition: string) {
  let r = await post("/algorithm/create", { name, content, descrition });
  return r.data.id;
}

export async function removeAlgorithm(id: string) {
  let r = await post("/algorithm/remove", { id });
  return r.flag;
}

export async function renameAlgorithm(id: string, name: string) {
  let r = await post("/algorithm/rename", { id, name });
  return r.flag;
}

export async function saveAlgorithm(id: string, content: string) {
  let r = await post("/algorithm/save", { id, content });
  return r.flag;
}

export async function updateAlgorithmDescrition(id: string, descrition: string) {
  let r = await post("/algorithm/updateDescrition", { id, descrition });
  return r.flag;
}

export async function changeAlgorithmPermission(id: string, permission: number) {
  let r = await post("/algorithm/updatePermission", { id, permission });
  return r.flag;
}

export async function getAlgorithmInfo(id: string) {
  let r = await get("/algorithm/loadInfo", { id });
  if (r.code === ResultCode.NoPermission) {
    nav("/algorithmCenter");
  }
  return r.data;
}

export async function searchAlgorithm(name: string): Promise<GetAlgorithmResponseData> {
  let account = getAccount();
  let r;
  if (account === null) {
    r = await get("/algorithm/search", { name });
  } else {
    r = await get("/algorithm/searchContainMine", { name });
  }
  return r.data;
}

export async function getMyAlgorithm(): Promise<GetAlgorithmResponseData> {
  let r = await get("/algorithm/mine", {});
  return r.data;
}

export async function searchAlgorithmByUser(account: string): Promise<GetAlgorithmResponseData> {
  let self = getAccount();
  let r;
  if (account !== self) {
    r = (await get("/algorithm/searchByUser", { account })).data;
  } else {
    r = await getMyAlgorithm();
  }
  return r;
}

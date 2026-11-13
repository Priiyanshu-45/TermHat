import Conf from "conf";

const conf = new Conf({ projectName: "termhat" });

export function configure(apiKey: string, provider: string, model: string) {
  conf.set("apiKey", apiKey);
  conf.set("provider", provider);
  conf.set("model", model);
}


export function getConfig() {
  const config = {
  apiKey: conf.get("apiKey"),
  provider: conf.get("provider"),
  model: conf.get("model"),
  }
  return config;
}

export function clearConfig() {
    conf.clear();
}
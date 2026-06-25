import * as salesforce from "./salesforce";
import * as hubspot from "./hubspot";
import * as quickbooks from "./quickbooks";
import * as jira from "./jira";
import * as sap from "./sap";
import * as general from "./general";

export type Agent = {
  softwareName: string;
  softwareDescription: string;
  commonIssues: string[];
  systemPrompt: string;
  key: string;
};

export const agents: Record<string, Agent> = {
  salesforce: { ...salesforce, key: "salesforce" },
  hubspot: { ...hubspot, key: "hubspot" },
  quickbooks: { ...quickbooks, key: "quickbooks" },
  jira: { ...jira, key: "jira" },
  sap: { ...sap, key: "sap" },
  general: { ...general, key: "general" },
};

export const agentList = Object.values(agents);

export function getAgent(key: string): Agent {
  return agents[key] ?? agents.general;
}

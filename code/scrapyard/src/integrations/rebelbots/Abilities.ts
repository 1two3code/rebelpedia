export type AbilityName = 'Recycle' | 'Lucky' | 'Taunt' | 'Absorb' | 'Reflect' | 'Dodge' | 'Revenge' | 'Avenge' | 'Pierce' | 'Spiked' | 'Rapid-Fire' | 'Overheat' | 'Grounded' | 'Purge' | 'Unlucky' | 'Ransomware' | 'Overload' | 'Weak' | 'Frail' | 'Dazed' | 'Fizzle' | 'Burn' | 'Downgrade' | 'Target-Lock' | 'Zap' | 'Relocate' | 'Fixate' | 'Processing' | 'Anticipate' | 'Follow-Up' | 'Power-Up' | 'Deal-Damage' | 'Power' | 'Shield' | 'Draw' | 'Repair' | 'Energy' | 'Cost' | 'Discard' | 'Boost'
export type Ability = {
  ID: number;
  Name: AbilityName;
  "Description (in game)": string;
  Grouping: string;
  Limit: number;
  "Stack Scaling": number;
  "Removal Rules": RemovalRules;
  Icon: ActionRequired;
  "Action Required?": ActionRequired;
  "Action required Text": string;
  keywordEnum: string;
  iconURL: string;
}

export enum ActionRequired {
  Empty = "",
  No = "No",
  Yes = "Yes",
}

export enum RemovalRules {
  Buff1Removeall = "BUFF1_REMOVEALL",
  Buff2Remove1 = "BUFF2_REMOVE1",
  Buff2Removeall = "BUFF2_REMOVEALL",
  Empty = "",
  WhenUsed = "WHEN_USED",
}

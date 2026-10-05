export type Alignment = "left" | "center" | "right";

export interface TableInput {
  headers: string[];
  rows: string[][];
  alignments: Alignment[];
}

export interface ListItem {
  text: string;
  depth: number;
}

export interface TaskItem extends ListItem {
  checked: boolean;
}

export type AlertType = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

export interface ReadmeSection {
  id: string;
  type: string;
  title: string;
  content: string;
  enabled: boolean;
}

export interface ReadmeTemplate {
  id: string;
  name: string;
  description: string;
  sections: ReadmeSection[];
}

export interface BuilderState {
  version: 1;
  templateId: string;
  sections: ReadmeSection[];
}

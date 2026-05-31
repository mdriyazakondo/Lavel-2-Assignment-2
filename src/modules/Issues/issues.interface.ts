export type TIssue = {
  title?: string;
  description?: string;
  issue_type?: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
  reporter_id?: number;
};

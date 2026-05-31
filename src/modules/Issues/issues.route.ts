import express from "express";
import { issueController } from "./issues.controller";

const router = express.Router();

router.post("/", issueController.createIssueController);
router.get("/:id", issueController.singleIssueController);
router.put("/:id", issueController.updateIssueController);
router.delete("/:id", issueController.deleteIssueController);

export const issuesRouter = router;

import express from "express";
import { issueController } from "./issues.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../utility";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.CONTRIBUTOR),
  issueController.createIssueController,
);
router.get(
  "/:id",
  auth(UserRole.CONTRIBUTOR),
  issueController.singleIssueController,
);
router.put(
  "/:id",
  auth(UserRole.CONTRIBUTOR),
  issueController.updateIssueController,
);
router.get(
  "/",
  auth(UserRole.CONTRIBUTOR),
  issueController.getAllIssuesController,
);
router.delete(
  "/:id",
  auth(UserRole.MAINTAINER),
  issueController.deleteIssueController,
);

export const issuesRouter = router;

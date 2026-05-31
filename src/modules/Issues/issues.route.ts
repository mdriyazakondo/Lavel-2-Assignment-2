import express from "express";
import { issueController } from "./issues.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../utility";
import maintainer from "../../middleware/maintainer";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.CONTRIBUTOR, UserRole.MAINTAINER),
  issueController.createIssueController,
);

router.get(
  "/",
  maintainer(),
  auth(UserRole.CONTRIBUTOR),
  issueController.getAllIssuesController,
);

router.get(
  "/:id",

  auth(UserRole.CONTRIBUTOR, UserRole.MAINTAINER),

  issueController.singleIssueController,
);
router.put(
  "/:id",
  auth(UserRole.CONTRIBUTOR, UserRole.MAINTAINER),
  issueController.updateIssueController,
);

router.delete(
  "/:id",
  auth(UserRole.MAINTAINER),
  issueController.deleteIssueController,
);

export const issuesRouter = router;

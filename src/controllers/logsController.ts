import type { Request, Response } from "express";
import Log, { type LogAttributes } from "../models/Log.js";
import User from "../models/User.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { Op, type WhereOptions } from "sequelize";
import type { AddLogTypes } from "../models/types/LogTypes.js";

export const getAllLogs = asyncHandler(async (req: Request, res: Response) => {
  const {
    user_id,
    userName,
    action,
    startDate,
    endDate,
    page = "1",
    limit = "5",
  } = req.query as AddLogTypes & {
    page?: string;
    limit?: string;
  };

  const pageNum = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 5;
  const offset = (pageNum - 1) * pageSize;

  // Build where clause dynamically
  const where: WhereOptions<LogAttributes> = {};
  if (user_id) where.user_id = user_id;
  if (action) where.action = { [Op.like]: `%${action}%` };
  if (startDate && endDate) {
    where.timestamp = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    where.timestamp = { [Op.gte]: new Date(startDate) };
  } else if (endDate) {
    where.timestamp = { [Op.lte]: new Date(endDate) };
  }

  // Fetch logs with pagination

  const includeUser: any = {
    model: User,
    attributes: ["name"],
  };

  if (userName) {
    includeUser.where = { name: { [Op.like]: `%${userName}%` } };
  }

  // Fetch logs with pagination
  const { rows: logs, count: totalLogs } = await Log.findAndCountAll({
    where,
    attributes: ["id", "action", "timestamp", "user_id"],
    include: [includeUser],
    order: [["timestamp", "DESC"]],
    limit: pageSize,
    offset,
  });

  const totalPages = Math.ceil(totalLogs / pageSize);

  return res.json({
    message: "Logs Fetched Successfully.",
    logs,
    pagination: {
      totalLogs,
      totalPages,
      currentPage: pageNum,
      pageSize,
    },
  });
});

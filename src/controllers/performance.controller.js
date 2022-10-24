const mongoose = require("mongoose");
const createError = require("http-errors");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const ERROR = require("../constants/error");

exports.postPerformance = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless"],
    });

    const options = {
      logLevel: "info",
      output: "json",
      port: chrome.port,
    };

    const lighthouseResult = await lighthouse(
      `${process.env.BACK_URL}/api/projects/${projectId}/deployment`,
      options,
    );

    await chrome.kill();

    const {
      categories: {
        performance: { score: performanceScore },
        accessibility: { score: accessibilityScore },
        "best-practices": { score: bestPracticesScore },
        seo: { score: seoScore },
        pwa: { score: pwaScore },
      },
    } = lighthouseResult.lhr;

    const measuringResult = {
      performance: performanceScore * 100,
      accessibility: accessibilityScore * 100,
      bestPractices: bestPracticesScore * 100,
      seo: seoScore * 100,
      pwa: pwaScore * 100,
    };

    res.status(200).json({ result: "Success", measuringResult });
  } catch (err) {
    next(err);
  }
};

import { prisma } from "./lib/prisma.js";
import roadmapData from "../data.json" with { type: "json" };


async function main() {
  for (const step of roadmapData) {
    await prisma.step.create({
      data: {
        title: step.step_title,

        subSteps: {
          create: step.sub_steps.map((subStep) => ({
            title: subStep.sub_step_title,
            stepId: step.id,
            topics: {
              create: subStep.topics.map((topic) => ({
                questionTitle: topic.question_title,
                postLink: topic.post_link,
                ytLink: topic.yt_link,
                plusLink: topic.plus_link,
                editorialLink: topic.editorial_link,
                gfgLink: topic.gfg_link,
                csLink: topic.cs_link,
                lcLink: topic.lc_link,
                difficulty: topic.difficulty || 0,
                subStepId: subStep.id,
              })),
            },
          })),
        },
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
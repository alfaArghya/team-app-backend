import zod from "zod";

export const createTeamInput = zod.object({
  teamName: zod.string().max(20, {
    message: "Team Name maximum length must be less than 20 characters",
  }),
  teamDescription: zod.string().max(100, {
    message: "Team description must be less than 100 characters",
  }),
  admin: zod.string(),
  teamMembers: zod.array(zod.string()),
});

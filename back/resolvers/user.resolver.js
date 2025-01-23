import { users } from "../exampleData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const userResolver = {
  Mutation: {
    // ======= register for MongoDB
    register: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("Please fill in all required fields");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          avatar: gender === "male" ? boyPic : girlPic,
        });

        await newUser.save();
        await context.login(newUser);

        return newUser;
      } catch (error) {
        console.error("Error of user registration: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    // ======= register for PostgreSQL (via prisma)
    // register: async (_, { input }, context) => {
    //   try {
    //     const { username, name, password, gender } = input;
    //     if (!username || !name || !password || !gender) {
    //       throw new Error("Please fill in all required fields");
    //     }

    //     const existingUser = await prisma.user.findUnique({
    //       where: { username },
    //     });
    //     if (existingUser) {
    //       throw new Error("User already exists");
    //     }

    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);

    //     const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    //     const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //     const newUser = await prisma.user.create({
    //       data: {
    //         username,
    //         name,
    //         password: hashedPassword,
    //         gender,
    //         avatar: gender === "male" ? boyPic : girlPic,
    //       },
    //     });

    //     await context.login(newUser);

    //     return newUser;
    //   } catch (error) {
    //     console.error("Error of user registration: ", error);
    //     throw new Error(error.message || "Internal server error");
    //   }
    // },
  },

  Query: {
    users: () => {
      return users;
    },
    // user: (_, args) => {
    //   return users.find((user) => user._id === args.userId);
    // },
  },
};

export default userResolver;

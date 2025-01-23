import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing user");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid username or password");
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error("Invalid username or password");
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const configurePassport = async () => {
//   passport.serializeUser((user, done) => {
//     console.log("Serializing user");
//     done(null, user.id); // Save the user's ID in the session
//   });

//   passport.deserializeUser(async (id, done) => {
//     console.log("Deserializing user");
//     try {
//       const user = await prisma.user.findUnique({
//         where: { id },
//       });
//       done(null, user); // Attach the user to the session
//     } catch (err) {
//       done(err);
//     }
//   });

//   passport.use(
//     new GraphQLLocalStrategy(async (username, password, done) => {
//       try {
//         const user = await prisma.user.findUnique({
//           where: { username },
//         });

//         if (!user) {
//           throw new Error("Invalid username or password");
//         }

//         const validPassword = await bcrypt.compare(password, user.password);

//         if (!validPassword) {
//           throw new Error("Invalid username or password");
//         }

//         return done(null, user); // User is authenticated
//       } catch (err) {
//         return done(err);
//       }
//     })
//   );
// };

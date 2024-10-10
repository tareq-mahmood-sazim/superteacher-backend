"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const postgres_1 = __importDefault(require("postgres"));
const sql = (0, postgres_1.default)("postgresql://postgres:postgres@localhost:5432/superteacher");
function random_alphaneumeric_string_generator(length = 8) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter your email ->", (email) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const code = random_alphaneumeric_string_generator(8);
    const createdAt = new Date();
    const updatedAt = new Date();
    const check = yield sql`SELECT * FROM otp WHERE email = ${email}`;
    if (check.length > 0) {
      console.log(`OTP already sent to this email. OTP -> ${check[0].otp}`);
      process.exit(0);
    }
    const call = yield sql`
        INSERT INTO otp (created_At, updated_At, email, otp, wrong_attempts) 
        VALUES 
        (${createdAt}, ${updatedAt}, ${email}, ${code}, 0)`;
    if (!email) {
      console.log("Please enter valid email.");
    } else {
      console.log(`Unique code for ${email} -> ${code} ✨`);
      console.log(call);
      process.exit(0);
    }
    rl.close();
  }),
);

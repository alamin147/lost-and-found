import express from "express";
import { userController } from "../modules/user/user.controllers";
import { authController } from "../auth/auth.controller";
import { foundItemcategoryController } from "../modules/foundItemCategory/foundItemcategory.controller";
import auth from "../midddlewares/auth";
import { foundItemController } from "../modules/foundItems/foundItem.controller";
import { claimsController } from "../modules/claim/claim.controller";
import validateRequest from "../midddlewares/validate";
import { UserSchema } from "../modules/user/user.validate";
import { FoundItemCategorySchema } from "../modules/foundItemCategory/foundItemCategory.validate";
import { FoundItemSchema } from "../modules/foundItems/foundItems.validate";
import { ItemClaimSchema } from "../modules/claim/claim.validate";
import { lostItemController } from "../modules/lostItem/lost.controller";

const router = express.Router();
////////////////////////////////////////////////// user //////////////////////////////////////////////
// user registraion
router.post(
  "/register",
  validateRequest(UserSchema.userRegisterSchema),
  userController.registerUser
);

//get users
router.get(
  "/users",
  // auth(),
  userController.allUsers
);

// user login
router.post(
  "/login",
  validateRequest(UserSchema.userLoginSchema),
  authController.login
);
///////////////////////////////////////////////////profile //////////////////////////////////////////////
// change password
router.post(
  "/change-password",
  auth(),
  validateRequest(UserSchema.changePasswordSchema),
  authController.newPasswords
);
// change email
router.post(
  "/change-email",
  auth(),
  validateRequest(UserSchema.changeEmailUsernameSchema),
  authController.changeEmail
);
// change username
router.post(
  "/change-username",
  auth(),
  validateRequest(UserSchema.changeEmailUsernameSchema),
  authController.changeUsername
);
///////////////////////////////////////////////////found item//////////////////////////////////////////////
// category create
router.post(
  "/found-item-categories",
  validateRequest(FoundItemCategorySchema.createFoundItemCategory),
  auth(),
  foundItemcategoryController.createItemCategory
);

// found item category get
router.get(
  "/found-item-categories",
  foundItemcategoryController.getItemCategory
);

// found item create
router.post("/found-items",
  validateRequest(FoundItemSchema.createFoundItem),
  auth(),
  foundItemController.createFoundItem
);

// found item get
router.get("/found-items", foundItemController.getFoundItem);
// single found item get
router.get("/found-item/:id", foundItemController.getSingleFoundItem);
///////////////////////////////////////////////////claim//////////////////////////////////////////////
// claim create
router.post(
  "/claims",
  validateRequest(ItemClaimSchema.createClaim),
  auth(),
  claimsController.createClaim
);

// claims get
router.get("/claims", auth(), claimsController.getClaim);

// claims update
router.put(
  "/claims/:claimId",
  validateRequest(ItemClaimSchema.updateClaim),
  auth(),
  claimsController.updateClaimStatus
);
///////////////////////////////////////////////////lost item//////////////////////////////////////////////

// lost item mark as found
router.put("/found-lost", auth(), lostItemController.markAsFound);
// create lost item
router.post("/lostItem", auth(), lostItemController.createLostItem);
// get lost item
router.get("/lostItem", lostItemController.getLostItem);
// get single lost item
router.get("/lostItem/:id", lostItemController.getSingleLostItem);

export default router;


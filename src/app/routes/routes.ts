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
import { utils } from "../utils/utils";
import { adminStats } from "../utils/adminStats";

const router = express.Router();
////////////////////////////////////////////////// user //////////////////////////////////////////////
// user registraion
router.post(
  "/register",
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
  validateRequest(UserSchema.changeEmailSchema),
  authController.changeEmail
);
// change username
router.post(
  "/change-username",
  auth(),
  validateRequest(UserSchema.changeUsernameSchema),
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

// claims get all
router.get("/claims", auth(), claimsController.getClaim);

// my claims get 
router.get("/my/claims", auth(), claimsController.getMyClaim);

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
// get my lost item
router.get("/my/lostItem",auth(), lostItemController.getMyLostItem);
// get my found item
router.get("/my/foundItem",auth(), foundItemController.getMyFoundItem);

// my lost item edit
router.put("/my/lostItem",auth(), lostItemController.editMyLostItem);
// my found item edit
router.put("/my/foundItem",auth(), foundItemController.editMyFoundItem);

// delete my lost item
router.delete("/my/lostItem/:id",auth(), lostItemController.deleteMyLostItem);
// delete my found item
router.delete("/my/foundItem/:id",auth(), foundItemController.deleteMyFoundItem);


// get stats for admin
router.get("/admin/stats",auth(), adminStats);

// block a user
router.put("/block/user/:id",auth(), userController.blockUser);

export default router;


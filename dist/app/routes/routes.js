"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../modules/user/user.controllers");
const auth_controller_1 = require("../auth/auth.controller");
const foundItemcategory_controller_1 = require("../modules/foundItemCategory/foundItemcategory.controller");
const auth_1 = __importDefault(require("../midddlewares/auth"));
const foundItem_controller_1 = require("../modules/foundItems/foundItem.controller");
const claim_controller_1 = require("../modules/claim/claim.controller");
const validate_1 = __importDefault(require("../midddlewares/validate"));
const user_validate_1 = require("../modules/user/user.validate");
const foundItemCategory_validate_1 = require("../modules/foundItemCategory/foundItemCategory.validate");
const foundItems_validate_1 = require("../modules/foundItems/foundItems.validate");
const claim_validate_1 = require("../modules/claim/claim.validate");
const lost_controller_1 = require("../modules/lostItem/lost.controller");
const adminStats_1 = require("../utils/adminStats");
const router = express_1.default.Router();
////////////////////////////////////////////////// user //////////////////////////////////////////////
// user registraion
router.post("/register", user_controllers_1.userController.registerUser);
//get users
router.get("/users", 
// auth(),
user_controllers_1.userController.allUsers);
// user login
router.post("/login", (0, validate_1.default)(user_validate_1.UserSchema.userLoginSchema), auth_controller_1.authController.login);
///////////////////////////////////////////////////profile //////////////////////////////////////////////
// change password
router.post("/change-password", (0, auth_1.default)(), (0, validate_1.default)(user_validate_1.UserSchema.changePasswordSchema), auth_controller_1.authController.newPasswords);
// change email
router.post("/change-email", (0, auth_1.default)(), (0, validate_1.default)(user_validate_1.UserSchema.changeEmailSchema), auth_controller_1.authController.changeEmail);
// change username
router.post("/change-username", (0, auth_1.default)(), (0, validate_1.default)(user_validate_1.UserSchema.changeUsernameSchema), auth_controller_1.authController.changeUsername);
///////////////////////////////////////////////////found item//////////////////////////////////////////////
// category create
router.post("/found-item-categories", (0, validate_1.default)(foundItemCategory_validate_1.FoundItemCategorySchema.createFoundItemCategory), (0, auth_1.default)(), foundItemcategory_controller_1.foundItemcategoryController.createItemCategory);
// found item category get
router.get("/found-item-categories", foundItemcategory_controller_1.foundItemcategoryController.getItemCategory);
// found item create
router.post("/found-items", (0, validate_1.default)(foundItems_validate_1.FoundItemSchema.createFoundItem), (0, auth_1.default)(), foundItem_controller_1.foundItemController.createFoundItem);
// found item get
router.get("/found-items", foundItem_controller_1.foundItemController.getFoundItem);
// single found item get
router.get("/found-item/:id", foundItem_controller_1.foundItemController.getSingleFoundItem);
///////////////////////////////////////////////////claim//////////////////////////////////////////////
// claim create
router.post("/claims", (0, validate_1.default)(claim_validate_1.ItemClaimSchema.createClaim), (0, auth_1.default)(), claim_controller_1.claimsController.createClaim);
// claims get all
router.get("/claims", (0, auth_1.default)(), claim_controller_1.claimsController.getClaim);
// my claims get 
router.get("/my/claims", (0, auth_1.default)(), claim_controller_1.claimsController.getMyClaim);
// claims update
router.put("/claims/:claimId", (0, validate_1.default)(claim_validate_1.ItemClaimSchema.updateClaim), (0, auth_1.default)(), claim_controller_1.claimsController.updateClaimStatus);
///////////////////////////////////////////////////lost item//////////////////////////////////////////////
// lost item mark as found
router.put("/found-lost", (0, auth_1.default)(), lost_controller_1.lostItemController.markAsFound);
// create lost item
router.post("/lostItem", (0, auth_1.default)(), lost_controller_1.lostItemController.createLostItem);
// get lost item
router.get("/lostItem", lost_controller_1.lostItemController.getLostItem);
// get single lost item
router.get("/lostItem/:id", lost_controller_1.lostItemController.getSingleLostItem);
// get my lost item
router.get("/my/lostItem", (0, auth_1.default)(), lost_controller_1.lostItemController.getMyLostItem);
// get my found item
router.get("/my/foundItem", (0, auth_1.default)(), foundItem_controller_1.foundItemController.getMyFoundItem);
// my lost item edit
router.put("/my/lostItem", (0, auth_1.default)(), lost_controller_1.lostItemController.editMyLostItem);
// my found item edit
router.put("/my/foundItem", (0, auth_1.default)(), foundItem_controller_1.foundItemController.editMyFoundItem);
// delete my lost item
router.delete("/my/lostItem/:id", (0, auth_1.default)(), lost_controller_1.lostItemController.deleteMyLostItem);
// delete my found item
router.delete("/my/foundItem/:id", (0, auth_1.default)(), foundItem_controller_1.foundItemController.deleteMyFoundItem);
// get stats for admin
router.get("/admin/stats", (0, auth_1.default)(), adminStats_1.adminStats);
// block a user
router.put("/block/user/:id", (0, auth_1.default)(), user_controllers_1.userController.blockUser);
exports.default = router;

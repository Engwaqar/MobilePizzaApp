// live hosts

export default urls = {
  HOST: "https://fooddelivery.egreatminds.com/WebApi/",
  BASE_URL: "https://fooddelivery.egreatminds.com/WebApi/",
  //Login
  LOGIN: "api/Auth/Login",
  REGISTER: "api/Auth/Register",
  VERIFICATION: "api/Auth/VerifyUser",
  GET_BANNERS: "api/SlideShow/GetAllSlideShows/",
  Get_Menu: "api/Category/GetAllCategories",
  GET_CATEGORIES: "api/Category/GetAllCategories/",
  GET_CATEGORIES_BY_ID: "api/Item/GetAllItem/",
  get_menu_detail: "api/Item/GetItemDetailsById/",
  Get_Deals: "api/Deal/GetAllDeal/",
  Get_Deals_Detail: "api/Deal/GetDealDetailsById/",
  GET_Profile: "api/Auth/GetAllUsers",
  EDIT_PROFILE: "api/Auth/EditUser/",
  ADD_TO_CART: "api/OrderDetail/AddToCartCall",
  GET_CART_DETAILS: "api/Order/GetCartList", //api/Order/GetCartList
  DELETE_Order: "api/OrderDetail/DeleteOrderDetailById/",
  GET_ORDER_HISTORY: "api/Order/GetAllOrdersDetail",
  CHECKOUT_ORDER: "api/Order/ProcessOrder",
  SEARCH: "api/Item/GetAllItemByWord",
  SEARCH_BY_LOCATION:'api/Item/GetItemSearchbylocation',
  GET_ORDER_FOR_RIDER:'api/Order/GetOrderForRider',
  UPDATE_RIDER_STATUS:'api/Order/RiderStuatusUpdate',
  NEARBY_SHOPS:'api/Company/GetAllCompanyByLatLong?Range=',
  GetAllFeaturedAds:'api/SlideShow/GetAllFeaturedAds/',
  SEARCH_COMPANY:'api/Company/SearchCompany/',
  GetPaymentType:'api/Order/GetPaymentType',
  Bill_PAYMENTS:'api/BillPayments/AddBillPayments'
};

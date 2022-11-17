import { ThirdwebAuth } from  "@thirdweb-dev/auth/next";

export const { ThirdwebAuthHandler , getUser }= ThirdwebAuth({
 privateKey:"ed5c47c2324c05633687d255dfc5ab76601a35302b56b8cf3401f01a0d68620d",
 domain:"example.com"
});
export default ThirdwebAuthHandler();
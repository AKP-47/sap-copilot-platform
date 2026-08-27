import { verifyOwnerCredentials } from "./api/_lib/ownerStore.ts";

console.log("Testing verifyOwnerCredentials:");
const t1 = verifyOwnerCredentials("akshatpandey12805@gmail.com", "1285");
console.log("Test 1 (akshatpandey12805@gmail.com / 1285):", t1);

const t2 = verifyOwnerCredentials("akshat", "1285");
console.log("Test 2 (akshat / 1285):", t2);

const t3 = verifyOwnerCredentials("akshatpandey12805@gmail.com", "12805");
console.log("Test 3 (akshatpandey12805@gmail.com / 12805):", t3);

const t4 = verifyOwnerCredentials("wrong_user@gmail.com", "wrong_pass");
console.log("Test 4 (wrong / wrong):", t4);

if (t1.valid && t2.valid && t3.valid && !t4.valid) {
  console.log("ALL TESTS PASSED WITH 100% SUCCESS!");
} else {
  console.error("FAILURES DETECTED");
}

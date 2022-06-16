-- AddForeignKey
ALTER TABLE "ShoppingPref" ADD CONSTRAINT "ShoppingPref_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShoppingPrefService {

  constructor(private prisma: PrismaService) { }
  async create(data: Prisma.ShoppingPrefCreateInput) {
    const existingPref = await this.prisma.shoppingPref.findFirst({
      where : {
        userId : data.userId,
        preference: data.preference
      }
    })
    if(!existingPref) {
      return  await this.prisma.shoppingPref.create({
        data
      });
    } else {
      throw new BadRequestException("Already added as a preference")
    }
  }

  async findAll(id) {
    return await this.prisma.shoppingPref.findMany({
      where : {
        userId : id
      },
      select : {id: true, preference: true}
    })
  }
}

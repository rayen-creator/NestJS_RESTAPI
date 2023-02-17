import { HttpStatus } from '@nestjs/common';
import { ForbiddenException, HttpException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prismaService: PrismaService) { }
    getBookmarks(userId: number) {
        this.prismaService.bookmark.findMany({
            where: {
                userId
            }
        })
    }

    getBookmarksById(userId: number, bookmarkId: number) {
        this.prismaService.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId: userId
            }
        });
    }

    async createBookmark(
        userId: number,
        dto: CreateBookmarkDto,
    ) {
        // console.log("dto :", dto);
        return await this.prismaService.bookmark.create({
            data: {
                userId,
                ...dto
            },
        });
    }


    async updateBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });

        if (!bookmark) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }

        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access to resource denied');
        }
        return this.prismaService.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...dto
            }
        });

    }

    async deleteBookmark(userId: number, bookmarkId: number) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });

        if (!bookmark) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        return this.prismaService.bookmark.delete({
            where: {
                id: bookmarkId
            }
        });
    }

}

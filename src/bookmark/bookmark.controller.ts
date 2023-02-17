import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) { }

    @Get('getallbookmarks')
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(userId);
    }
    @Get('getBookmarksById/:id')
    getBookmarksById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.getBookmarksById(userId, bookmarkId);
    }
    @Post('createBookmark')
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
        console.log("dto :", dto);
        console.log("userId :", userId);

        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Put('updateBookmark/:id')
    updateBookmark(@GetUser('id') userId: number,bookmarkId:number , @Body() dto: EditBookmarkDto) {
        
        return this.bookmarkService.updateBookmark(userId,bookmarkId ,dto);
    }

    @Delete('deleteBookmark/:id')
    deleteBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.deleteBookmark(userId, bookmarkId);
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
  protected $fillable = [
    'title',
    'subtitle',
    'author',
    'book_description',
    'publish_date',
    'publisher',
    'cover_image_url'
  ];

}

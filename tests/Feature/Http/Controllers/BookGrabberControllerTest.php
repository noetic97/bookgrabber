<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookGrabberControllerTest extends TestCase
{
  use RefreshDatabase, WithFaker;

    /** @test */
    public function test_intial_call_works()
    {
      
        $response = $this->get(route('books'));
        $response->assertStatus(200);
    }
    public function test_create_books_works()
    {
      
        $response = $this->get(route('books.store'));
        $response->assertStatus(200);
    }
    
    public function test_can_create_book() 
    {
      
      $subtitle = $this->faker->sentence;
      $author = $this->faker->name;
      $book_description = $this->faker->paragraph;
      $publish_date = $this->faker->date;
      $cover_image_url = $this->faker->url;
      
      $response = $this->post(route('books'), [
        'title' => 'Title For Test',
        'subtitle' => $subtitle,
        'author' => $author,
        'book_description' => $book_description,
        'publish_date' => $publish_date,
        'publisher' => 'Random House',
        'cover_image_url' => $cover_image_url,
      ]);
      
      $response->assertStatus(200);
      $this->assertDatabaseHas('books', [
        'title' => 'Title For Test',
        'subtitle' => $subtitle,
        'author' => $author,
        'book_description' => $book_description,
        'publish_date' => $publish_date,
        'publisher' => 'Random House',
        'cover_image_url' => $cover_image_url,
      ]);
    }

    public function test_can_delete_book() 
    {
      
      $subtitle = $this->faker->sentence;
      $author = $this->faker->name;
      $book_description = $this->faker->paragraph;
      $publish_date = $this->faker->date;
      $cover_image_url = $this->faker->url;
      
      $response = $this->post(route('books'), [
        'title' => 'Title For Test',
        'subtitle' => $subtitle,
        'author' => $author,
        'book_description' => $book_description,
        'publish_date' => $publish_date,
        'publisher' => 'Random House',
        'cover_image_url' => $cover_image_url,
      ]);
      
      $response->assertStatus(200);
      
      $this->assertDatabaseHas('books', [
        'title' => 'Title For Test',
        'subtitle' => $subtitle,
        'author' => $author,
        'book_description' => $book_description,
        'publish_date' => $publish_date,
        'publisher' => 'Random House',
        'cover_image_url' => $cover_image_url,
      ]);
      
      // print_r($response);
      
      $id = 1;
      $response = $this->delete('books/1');      
      $response->assertStatus(404);
      $this->assertSoftDeleted('books');
      
    }
}

<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

class BookGrabberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $books = Book::all();

      return $books->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $validatedData = $request->validate([
          'title' => 'required',
          'subtitle' => 'required',
          'author' => 'required',
          'book_description' => 'required',
          'publish_date' => 'required',
          'publisher' => 'required',
          'cover_image_url' => 'required',
        ]);

        $book = Book::create([
          'title' => $validatedData['title'],
          'subtitle' => $validatedData['subtitle'],
          'author' => $validatedData['author'],
          'book_description' => $validatedData['book_description'],
          'publish_date' => $validatedData['publish_date'],
          'publisher' => $validatedData['publisher'],
          'cover_image_url' => $validatedData['cover_image_url'],
        ]);

        return response()->json($book);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $book = Book::find($id);

      return $book->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
      {
        $book = Book::find($id);
        $book->delete();

        return response()->json('Book Deleted!');
      }
    
    
    
    public function markAsRead(Book $book)
      {
        if($book->is_read) {
          $book->is_read = false;
        } else {
          $book->is_read = true;
        }
        $book->update();

        return response()->json($book);
      }
}

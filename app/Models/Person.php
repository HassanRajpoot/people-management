<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'user_id', 'name', 'surname', 'south_african_id', 'mobile_number', 'email', 'birth_date', 'language', 'interests'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    protected $casts = [
        'interests' => 'array',
    ];
}

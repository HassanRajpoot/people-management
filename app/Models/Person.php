<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
        protected $fillable = [
            'name',
            'surname',
            'south_african_id',
            'mobile_number',
            'email',
            'birth_date',
            'language',
            'interests',
        ];
    
        protected $casts = [
            'interests' => 'array',
        ];
}

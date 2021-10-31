<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends User
{
    use HasApiTokens,  HasFactory;
}

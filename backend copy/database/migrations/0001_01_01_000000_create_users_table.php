<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
<<<<<<< HEAD:backend/database/migrations/0001_01_01_000000_create_users_table.php
            $table->string('first_name'); 
            $table->string('last_name'); 
            $table->string('email')->unique();
            $table->string('password'); 
            $table->enum('role', ['doctor', 'nurse', 'admin', 'staff']);
            $table->string('phone_number')->nullable(); 
            $table->string('specialization')->nullable(); 
            $table->text('address')->nullable(); 
            $table->boolean('is_active')->default(true);
            $table->rememberToken(); 
=======
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25:backend copy/database/migrations/0001_01_01_000000_create_users_table.php
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};

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
            $table->string('first_name'); // First name
            $table->string('last_name');  // Last name
            $table->string('email')->unique(); // Unique email
            $table->string('password'); // Password

            // Roles: admin (super admin), doctor, nurse, pharmacist, lab_technician, dietician
            $table->enum('role', ['admin', 'doctor', 'nurse', 'pharmacist', 'lab_technician', 'dietician']);

            $table->string('phone_number')->nullable(); // Phone number
            $table->string('specialization')->nullable(); // Only used for some roles (doctor, dietician, etc.)
            $table->text('address')->nullable(); // Address
            $table->boolean('is_active')->default(true); // Account status
            $table->rememberToken(); // For session handling
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

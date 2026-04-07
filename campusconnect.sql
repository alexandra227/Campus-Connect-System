-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2026 at 07:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campusconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `priority` enum('normal','high') DEFAULT 'normal',
  `status` enum('draft','published') DEFAULT 'published',
  `author_id` int(10) UNSIGNED DEFAULT NULL,
  `college_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `priority`, `status`, `author_id`, `college_id`, `created_at`, `updated_at`) VALUES
(1, 'Campus Closure Notice', 'The campus will be closed on March 25, 2026 due to public holiday.', 'high', 'published', 3, NULL, '2026-04-07 17:37:32', '2026-04-07 17:37:32'),
(2, 'New Library Hours', 'Starting April 1st, the library will open from 8 AM to 10 PM.', 'normal', 'published', 3, NULL, '2026-04-07 17:37:32', '2026-04-07 17:37:32'),
(3, 'Scholarship Applications Open', 'Annual scholarship applications are now open. Deadline April 30.', 'high', 'published', 3, NULL, '2026-04-07 17:37:32', '2026-04-07 17:37:32'),
(4, 'Maintenance Notice', 'Server maintenance scheduled for April 10, 2026 from 2 AM to 6 AM.', 'normal', 'draft', 3, NULL, '2026-04-07 17:37:32', '2026-04-07 17:37:32');

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE `colleges` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `code` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`id`, `name`, `code`, `created_at`) VALUES
(1, 'College of Computer Studies', 'CCS', '2026-04-07 17:35:51'),
(2, 'College of Business Administration', 'CBA', '2026-04-07 17:35:51'),
(3, 'College of Engineering', 'COE', '2026-04-07 17:35:51'),
(4, 'College of Arts & Humanities', 'CAH', '2026-04-07 17:35:51'),
(5, 'College of Medicine', 'COM', '2026-04-07 17:35:51'),
(6, 'College of Law', 'COL', '2026-04-07 17:35:51');

-- --------------------------------------------------------

--
-- Table structure for table `cover_photo_uploads`
--

CREATE TABLE `cover_photo_uploads` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `uploaded_by` int(10) UNSIGNED NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `stored_path` varchar(500) NOT NULL,
  `mime_type` varchar(100) DEFAULT NULL,
  `file_size_bytes` int(10) UNSIGNED DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(10) UNSIGNED NOT NULL,
  `college_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `head` varchar(150) DEFAULT NULL,
  `members` int(10) UNSIGNED DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `college_id`, `name`, `head`, `members`, `status`, `created_at`) VALUES
(1, 1, 'Computer Science', 'Dr. John Smith', 45, 'active', '2026-04-07 17:36:06'),
(2, 2, 'Business Administration', 'Dr. Sarah Johnson', 32, 'active', '2026-04-07 17:36:06'),
(3, 3, 'Engineering', 'Dr. Michael Brown', 58, 'active', '2026-04-07 17:36:06'),
(4, 4, 'Arts & Humanities', 'Dr. Emily Davis', 28, 'active', '2026-04-07 17:36:06'),
(5, 5, 'Medicine', 'Dr. Robert Wilson', 35, 'active', '2026-04-07 17:36:06'),
(6, 6, 'Law', 'Dr. Patricia Martinez', 22, 'active', '2026-04-07 17:36:06');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `category` enum('Academic','Social','Sports','Org Event','Council Event','Non-Academic') NOT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `organizer_id` int(10) UNSIGNED DEFAULT NULL,
  `college_id` int(10) UNSIGNED DEFAULT NULL,
  `cover_photo_url` varchar(500) DEFAULT NULL,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `attendees_count` int(10) UNSIGNED DEFAULT 0,
  `status` enum('draft','published','cancelled') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `category`, `event_date`, `event_time`, `location`, `organizer_id`, `college_id`, `cover_photo_url`, `department_id`, `attendees_count`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Research Summit 2026', 'Faculty and student research showcase.', 'Academic', '2026-03-18', '09:00:00', 'CCS Auditorium', 1, 1, '/uploads/covers/research_summit.jpg', 1, 120, 'published', '2026-04-07 17:36:55', '2026-04-07 17:36:55'),
(2, 'Campus Music Fest', 'Annual live music event open to all.', 'Social', '2026-03-20', '16:00:00', 'Open Court', 2, 4, '/uploads/covers/music_fest.jpg', NULL, 80, 'published', '2026-04-07 17:36:55', '2026-04-07 17:36:55'),
(3, 'Hackathon 2026', '24-hour coding competition.', 'Academic', '2026-04-05', '08:00:00', 'CS Lab Building', NULL, 1, NULL, 1, 0, 'draft', '2026-04-07 17:36:55', '2026-04-07 17:36:55'),
(4, 'Intramurals Opening', 'Opening ceremony for intramural sports season.', 'Sports', '2026-03-22', '08:00:00', 'Gymnasium', 3, 3, '/uploads/covers/intramurals.jpg', NULL, 200, 'published', '2026-04-07 17:36:55', '2026-04-07 17:36:55'),
(5, 'Scholarship Fair', 'Explore scholarship opportunities.', 'Academic', '2026-04-10', '10:00:00', 'Student Center', NULL, NULL, NULL, NULL, 0, 'draft', '2026-04-07 17:36:55', '2026-04-07 17:36:55');

-- --------------------------------------------------------

--
-- Table structure for table `event_organizer_assignments`
--

CREATE TABLE `event_organizer_assignments` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `organizer_id` int(10) UNSIGNED NOT NULL,
  `assigned_by` int(10) UNSIGNED DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_registrations`
--

CREATE TABLE `event_registrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('registered','cancelled','attended') DEFAULT 'registered'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organizers`
--

CREATE TABLE `organizers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `college_id` int(10) UNSIGNED DEFAULT NULL,
  `description` text DEFAULT NULL,
  `members` int(10) UNSIGNED DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizers`
--

INSERT INTO `organizers` (`id`, `name`, `college_id`, `description`, `members`, `status`, `created_at`) VALUES
(1, 'CSS Society', 1, NULL, 320, 'active', '2026-04-07 17:36:35'),
(2, 'Music Circle', 4, NULL, 80, 'active', '2026-04-07 17:36:35'),
(3, 'Sports Club', 3, NULL, 210, 'active', '2026-04-07 17:36:35'),
(4, 'Student Government', NULL, NULL, 50, 'active', '2026-04-07 17:36:35'),
(5, 'Debate Club', 6, NULL, 60, 'active', '2026-04-07 17:36:35'),
(6, 'Drama Club', 4, NULL, 45, 'active', '2026-04-07 17:36:35'),
(7, 'Tech Innovation Club', 1, NULL, 130, 'active', '2026-04-07 17:36:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('student','officer','admin') DEFAULT 'student',
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `department_id`, `created_at`) VALUES
(1, 'Student', 'student@example.com', '$2b$12$placeholder_student', 'student', 1, '2026-04-07 17:36:21'),
(2, 'Officer', 'officer@example.com', '$2b$12$placeholder_officer', 'officer', 1, '2026-04-07 17:36:21'),
(3, 'Administrator', 'admin@example.com', '$2b$12$placeholder_admin', 'admin', NULL, '2026-04-07 17:36:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ann_author` (`author_id`),
  ADD KEY `fk_ann_college` (`college_id`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `cover_photo_uploads`
--
ALTER TABLE `cover_photo_uploads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cover_event` (`event_id`),
  ADD KEY `fk_cover_uploader` (`uploaded_by`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_dept_college` (`college_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_event_organizer` (`organizer_id`),
  ADD KEY `fk_event_college` (`college_id`),
  ADD KEY `fk_event_department` (`department_id`);

--
-- Indexes for table `event_organizer_assignments`
--
ALTER TABLE `event_organizer_assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_assignment` (`event_id`,`organizer_id`),
  ADD KEY `fk_assign_org` (`organizer_id`),
  ADD KEY `fk_assign_admin` (`assigned_by`);

--
-- Indexes for table `event_registrations`
--
ALTER TABLE `event_registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_event_user` (`event_id`,`user_id`),
  ADD KEY `fk_reg_user` (`user_id`);

--
-- Indexes for table `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_org_college` (`college_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_user_dept` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cover_photo_uploads`
--
ALTER TABLE `cover_photo_uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `event_organizer_assignments`
--
ALTER TABLE `event_organizer_assignments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_registrations`
--
ALTER TABLE `event_registrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organizers`
--
ALTER TABLE `organizers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `fk_ann_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_ann_college` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `cover_photo_uploads`
--
ALTER TABLE `cover_photo_uploads`
  ADD CONSTRAINT `fk_cover_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cover_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_dept_college` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_event_college` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_event_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_event_organizer` FOREIGN KEY (`organizer_id`) REFERENCES `organizers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `event_organizer_assignments`
--
ALTER TABLE `event_organizer_assignments`
  ADD CONSTRAINT `fk_assign_admin` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_assign_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_assign_org` FOREIGN KEY (`organizer_id`) REFERENCES `organizers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event_registrations`
--
ALTER TABLE `event_registrations`
  ADD CONSTRAINT `fk_reg_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reg_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organizers`
--
ALTER TABLE `organizers`
  ADD CONSTRAINT `fk_org_college` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

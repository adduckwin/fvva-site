CREATE TABLE `blog_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`metaTitle` varchar(500),
	`metaDescription` text,
	`metaKeywords` varchar(500),
	`image` text,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_articles_slug_unique` UNIQUE(`slug`)
);

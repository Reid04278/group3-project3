drop table if exists int_clean_data_cleaned cascade;
drop table if exists dom_cleaned_data cascade;
drop table if exists percent_change_post_covid cascade;
drop table if exists box_plot_data cascade;

CREATE TABLE "int_clean_data_cleaned" (
    "time" date not null,
	"country" varchar not null,
	"commodity" varchar not null,
	"price" float	
);

CREATE TABLE "dom_cleaned_data" (
    "month" date not null,
    "country" varchar NOT NULL,
	"price_type" varchar not null,
	"market" varchar not null,
	"price" float not null
);

CREATE TABLE "percent_change_post_covid" (
	"country" varchar not null,
	"price_type" varchar not null,
	"market" varchar not null,
	"commodity" varchar not null,
	"post_covid" float not null,
	"yearly" float not null
)

CREATE TABLE "ten_year_prices" (
	"country" varchar not null,
	"market" varchar not null,
	"commodity" varchar not null,
	"Price_Difference" varchar not null
)

CREATE TABLE "bar_wheat_2020" (
	"Year" int not null,
	"country" varchar not null,
	"commodity" varchar not null,
	"price" float not null
)

Create table "box_plot_data" (
	"country" varchar not null,
	"commodity" varchar not null,
	"min_price" float not null,
	"max_price" float not null,
	"median_price" float not null
)

Create table "line_graph_data"(
	"Year" int not null,
	"country" varchar not null,
	"commodity" varchar not null,
	"price" float not null
)
--Import csv's manually into each table by right-clicking on each table under "Tables" in the lefthand side menu
--and select "Import/Export Data". Select the appropriate csv file to import
--If unable to import csv's using this method, try running code in this format:

--Copy <table name> from '<filepath to csv>' delimiter ',' CSV HEADER;

--Replace <table name> and <filepath to csv> with the appropriate values for each individual table
--Remember to include the .csv extension in the filepath

Copy int_clean_data_cleaned from 'C:\Rutgers Bootcamp\Projects\Project_3_Submission\Covid-Effects-on-Food-Prices\cleaned_resources\int_clean_data_cleaned.csv' 
delimiter ',' CSV HEADER;

copy dom_cleaned_data from 'C:\Rutgers Bootcamp\Projects\Project_3_Submission\Covid-Effects-on-Food-Prices\cleaned_resources\new_dom_clean_data.csv'
Delimiter ',' csv header;

copy percent_change_post_covid from 'C:\Rutgers Bootcamp\Projects\Project_3_Submission\Covid-Effects-on-Food-Prices\cleaned_resources\percent_change_post_covid.csv'
Delimiter ',' csv header;
--Import csv's manually into each table
select * from int_clean_data_cleaned limit 20
select * from dom_cleaned_data limit 20
select * from percent_change_post_covid limit 20
select * from box_plot_data
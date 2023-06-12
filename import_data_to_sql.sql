drop table if exists int_clean_data_cleaned cascade;
drop table if exists dom_cleaned_data cascade;
drop table if exists percent_change_post_covid cascade;


CREATE TABLE "int_clean_data_cleaned" (
    "time" date,
	"country" varchar,
	"commodity" varchar,
	"price" float	
);

CREATE TABLE "dom_cleaned_data" (
    "month" date,
    "country" varchar,
	"price_type" varchar,
	"market" varchar,
	"commodity" varchar,
	"price" float
);

CREATE TABLE "percent_change_post_covid" (
	"country" varchar,
	"price_type" varchar,
	"market" varchar,
	"commodity" varchar,
	"post_covid" float,
	"yearly" float
);

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


--Run each line ONE AT A TIME to verify that tables imported correctly
select * from int_clean_data_cleaned limit 20
select * from dom_cleaned_data limit 20
select * from percent_change_post_covid limit 20
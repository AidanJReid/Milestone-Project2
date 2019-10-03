# UFO sightings worldwide between the dates of 25/8/2016 - 24/8/2017

The data dashboard displays five separate charts which present accumulated data concerning UFO activity spanning an entire year (until present records permit.)
It is designed to relay and visually present general behavioural patterns/shapes/frequency and locale of UFO sightings in a bite-sized and easily digestible format, as opposed to the reams of (often inconsistent) data presented in the source excel file.

## UX

![responsive.jpg](/images/responsive.jpg)

This site is for UFO enthusiasts, those with an interest in science-fiction and amateur astronomers and sky-gazers.
The site will primarily be of interest more to a US audience given the high incidence of UFO sightings recorded in the continent of North America.

1. <b>User story 1</b>: As a UFO enthusiast who is interested in the incidences of sightings (or lack thereof) in my vicinity
2. <b>User story 2</b>: As a hobbyist with an interest in sky-gazing (potentially as amateur astronomer) who has observed strange lights in the sky at night.
3. <b>User story 3</b>: As a science fiction afficionado and casual reader in things occulted and other-worldly.
4. <b>User story 4</b>: As a researcher or journalist with an interest in documenting and understanding unexplained phenomenon or patterns in human behaviour.
5. <b>User story 5</b>: Meteorological, aircraft or military personnel who have seen oddities in the sky at night and use the charts as corroboration or to cross-check their own findings.

### Wireframes

Initially I was going to display a composite graph near the top of the page, but decided against it because I felt that the parameters
I would use to display various lines (continents) lacked 'punch' given how few sightings occurred outside of North America.

![wireframe1.png](/images/snip1.png)
![wireframe1.png](/images/snip2.png)



## Features

### Existing features

##### Navbar
* Bootstrap code was used with Font Awesome for the 'Alien' icon.

##### Introductory text/Read More
* Clicking the button reveals a collapsible accordion of text, informing the user of the purpose and source of the content for the displayed charts.
The effect was achieved from [W3Schools](https://www.w3schools.com/howto/howto_js_accordion.asp)

##### Sightings by Continent pie chart
* Displays all the sightings in the aforementioned year by continent. Users can view the legend to quickly select a territory, 
and click on the legend to see which continent has the most sightings.

##### UFO Sightings by Date line graph
* Shows sightings as charted against the time period of one year. A select menu is presented which can be drilled into by choosing a continent.
* Alternatively, by clicking on a section of the previous pie chart, the results will be reflected in this particular line graph.

##### Sightings by State bar chart
* Visually representing all 52 states and the number of sightings therein.
* This includes a 53rd state (XX), which I denote in the accompanying text, and accounts for sightings outside of North America.


### Features Left to Implement

Given the high density of UFO sightings in North America, I felt that a great addition to this dashboard would be a choropleth map.
At this stage in my learning, I feel that it would be a considerable task and probably beyond the scope of what is required for this project.
Nevertheless, it is my intention to create this in the near-future, colour coding US states with a drill down effect that can present a powerful picture of high-frequency sightings.


## Technologies Used

##### HTML5
This code was used to structure each page, place charts and provide accompanying text to charts, accordions, Resources and Additional Resource sections. 
It also featured in the nav and footer sections of the page.

##### CSS3
This code was used to add style to the HTML specifications. CSS changes were made throughout the project in order to enhance the look 
and feel of the site. While the background color is mostly white, I played around with different colors on the charts and toggle areas.

#### Bootswatch
Used as primary skin for buttons and nav bar styling.

##### JavaScript 
JS was used to queue my charts, reset buttons and created functionality on the page.

##### Crossfilter
Used to provide interactivity between charts (line, bar, pie) enabling and improving user interaction with the raw data in visual format.

##### D3
Used to connect chart data together to make the charts with the help of HTML ids.

##### DC


##### jQuery


##### Data.world
The original dataset used was by Tim Renner at [Data.World](https://data.world/timothyrenner/ufo-sightings).
I extracted a year's worth of relevant data for the purposes of this project. The original file being over 130mg and dating back to the 1960's, I felt
that one year would be adequate and would provide the necessary insight to present a compelling story that fulfilled the project's purpose.

##### CSV and JSON
I added various JSON files primarily to compare/contrast data sources. 
Dealing with a relatively large dataset and various inconsistencies in certain fields, prompted me to create smaller datasets to test for feasibility.

##### AWSCloud9
I used Cloud 9 of AWS Educate, Cloud 9 to create this project which enabled me to connect and push to Github when needed.

##### GitHub


##### Balsamiq
Used for feasibility testing, discussion with mentor, brainstorming ideas and utlimately to create mockups of the project.


##### Bootstrap 4


## Testing

#### General


#### Navigation


#### Charts



#### Issues


| Number | Issue            | Resolution   |
|--------|------------------|--------------|
|  1  | Overlap w/ pie and legend   | Removed chart (mentor discussion suggested it was a rather redundant item in the dash |
|  2  | Line chart showing fill between first and last dates  | Identified error - not using dc.min.css |
|  3  | Responsive design  | Introduced Viewbox resizing and bootstrap containers  |
|  4  | Reset button missing  | Introduced several, including on footer  |
|  5  | Summary  | Written  |
|  6  | Additional Resources  | Written and link to orig source data |
|  7  | Footer  | Completed  |
|  8  | Drawn labels 'shape chart'  | Correctly rendered once dc.min.css was included in script files |
|  9  | Navbar section connect | Done |
|  10 | x-axis Sightings by state far away | Decided to keep it |
|  11 | Sharp Buttons | Using a bootstrap theme which seems to maintain the edge. Not a strong enough requirement for me to warrant change |

## Deployment

Deployed using the Master Branch on hosting platform GitHub Pages. 

The following steps were taken:

  1. Create a `master` branch in Github repository 
  2. Use Local AWS Cloud9 environment to build the site
  3. Commit files to the staging area using bash terminal commands: `git status`; `git add (specify directory)`; `git commit -m "add message"`
  4. Push files to the working environment using `git push`, which updates the repository
  5. Publish site from `master` branch using `settings` tab in the main page of the repository, select `source` as `master branch`, then `save`


## Credits

### Content

* UFO data from [Data.world](https://data.world/timothyrenner/ufo-sightings)

### Media

* Responsiveness and device images image from [Responsive Design](http://ami.responsivedesign.is/)

### Acknowledgements

* Inspiration from [Rob Simons](https://robsimons1.github.io/global-white-shark-attack-dashboard/) - pie chart ideas and layout
* Inspiration from [Aileen Donegan](https://adonegan.github.io/milestone2-dashboard/stats.html) - general layout and a kick-ass README!
* Inspiration from [Dano5324](https://github.com/dano5342/LotRDashboard) - namely the x-axis value tilt for my 52 states.
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // Checks it has an feed at all
            expect(allFeeds).toBeDefined();
            // Checks that the feed is not empty
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('should have an URL', function() {
            // Same old for loop to check the feeds object
            allFeeds.forEach(function(feed) {
                // Checks it has an "url"
                expect(allFeeds[i].url).toBeDefined();
                // Checks that the "url" is not empty
                expect(allFeeds[i].url.length).not.toBe(0);
                // Checks that the "url" is a string and not a boolean or number
                expect(typeof allFeeds[i].url).toBe("string");
            });
        });


        /* This test  loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('should have a name', function() {
            // Same old for loop to check the feeds object
            allFeeds.forEach(function(feed) {
                // Checks that it has a "name"
                expect(feed.name).toBeDefined();
                // Checks that the "name" is a string and not a boolean or number
                expect(typeof feed.name).toBe("string");
                // Checks that the "name" is not empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {
        // Sets two variables to keep the code DRY and short
        var menuToggle = document.querySelector(".menu-icon-link"),
            main = document.body;

        //  This test ensures the menu element is hidden by default.
        it('should be hidden by default', function() {
            expect(main.className).toContain("menu-hidden");
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again?
         */

        it('should toggle the visibility of the menu', function() {
            // Since the menu is initally hidden, the first click will
            // remove the .menu-hidden class from the body...
            menuToggle.click();
            expect(main.className).not.toContain("menu-hidden");

            // ...and if the users clicks again then the class should be
            // active again
            menuToggle.click();
            expect(main.className).toContain("menu-hidden");

        });

    });

    describe('Initial Entries', function() {

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        // Keeping the code DRY
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it("should show 1 entry after loadFeed runs", function(done) {
            var initEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(initEntries).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        //Sets the current feed to be compared to the new feed later
        var oldFeed;
        // Keeping the code DRY
        beforeEach(function(done) {

            loadFeed(0, function() {
                oldFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });

        });

        it("should change the content", function(done) {
            var newFeed = document.querySelector(".feed").innerHTML;
            // Checks if the old feed is the same as the new feed
            expect(oldFeed).not.toBe(newFeed);
            done();
        });

    });

}());

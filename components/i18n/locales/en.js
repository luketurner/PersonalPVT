angular.module("pvtApp").run(function (i18n) {
    i18n.register('en', 'English', {
        app: {
            title: "PersonalPVT"
        },

        nav: {
            back: "< Go Back >",
            short_back: "< Back >",
            take_test: "< Take Test >",
            data: "< Data >",
            settings: "< Settings >",
            cancel: "< Cancel >",
            delete: "< Delete >",
            download: "< Download >",
            download_all: "< Download All >",
            compare_all: "< compare all trials >"
        },

        home: {
            title: "Personal PVT",
            intro: {
                line1_strong: "Psychomotor Vigilance Task - PVT - testing can assess sleep deprivation levels.",
                line1_rest: " It does this by detecting periods of lapsed concentration, called \"microsleep\" (seriously), which are linked with tiredness.",
                line2: "Studies often have participants do the task over 10 times a day, but if you are less concerned with rigor, even just one or two tests a day can provide interesting results.",
                line3: "Note that this site uses your browser to store data, so you don't need to create an account. However, if you switch browsers, you won't be able to access your data unless you export it."
            }
        },

        settings: {
            title: "Trial Settings",
            autosave_note: "Settings are automatically saved for this browser.",
            fields: {
                trial_length: "Trial Length (sec)",
                lapse_threshold: "Lapse Threshold (ms)",
                show_instructions: "Show Instructions",
                language: "Language"
            }
        },

        pretrial: {
            instructions: {
                title: "Instructions",
                welcome: "Welcome! PVT testing is easy to understand: it's just a reflex game. Some numbers will flash onto the screen suddenly, and your job will be to respond as soon as possible, either with the spacebar or the mouse. When someone plays it, the screen looks something like this:",
                length_prefix: "The game will last for",
                length_middle: "seconds. If you want to change the length, visit your",
                length_link: "settings",
                length_suffix: ". You can also end the game at any time by clicking the x in the upper right or by pressing escape.",
                show_again: "Show these instructions before trial"
            },
            countdown: {
                starting_in: "Trial Starting In"
            }
        },

        results: {
            title: "Results",
            trials_summary: "{count} trials over {days} days",
            response_times: "Response times",
            summary: {
                mean: "Mean",
                median: "Median",
                max: "Max",
                min: "Min",
                lapses: "Lapses"
            },
            all: {
                mean_heading: "Mean response time",
                lapses_heading_prefix: "Num. lapses over"
            },
            empty: {
                heading: "You don't seem to have any data.",
                line1_prefix: "Hey there! Before you can see your historical data and test results, you have to actually",
                line1_link: "take a test",
                line1_suffix: ". gl;hf",
                line2: "(Remember that data isn't shared across browsers)"
            },
            download: {
                all_filename: "results_all",
                trial_prefix: "result_"
            }
        },

        deleteAll: {
            states: {
                start: "Delete All",
                confirm1: "You sure?",
                confirm2: "Double sure?",
                warn: "You can't undo!",
                done: "Deleted",
                loading: " ... "
            }
        },

        charts: {
            mean: "Mean",
            lapses: "Lapses"
        },

        // moment.js format strings; tokens like MMM/Do/h are auto-translated by
        // moment.locale(). Locales can override these to pick a totally different shape.
        formats: {
            trial_title: "MMM Do h:mm a",
            chart_date: "MMM Do h:mm"
        }
    });
});

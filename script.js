function Slider3__init() {
    $(".slider3").each(function(index, node) {
        var $slider = $(node);
        var $slides = $slider.find(".slides");
        var $slide = $slides.find("> div");

        var slidesCount = $slide.length;
        var displaySlidesCount = $slider.data("display-slides-count");
        displaySlidesCount = parseInt(displaySlidesCount);

        $slide.each(function(index, node) {
            var $curSlide = $(node);
            var widthPercent = 100 / displaySlidesCount;
            var leftPercent = widthPercent * index;

            $curSlide.css("width", widthPercent + "%");
            $curSlide.css("left", leftPercent + "%");

            $curSlide.data("width-percent", widthPercent);
            $curSlide.data("left-percent", leftPercent);
        });

        var autoplay = $slider.data("autoplay");

        $slider.data("autoplay-now-available", "Y");

        $slider.mouseenter(function() {
            $slider.data("autoplay-now-available", "N");
        });

        $slider.mouseleave(function() {
            $slider.data("autoplay-now-available", "Y");
        });

        if (autoplay == "Y") {
            setInterval(function() {
                if ($slider.data("autoplay-now-available") == "N") {
                    return false;
                }

                $slide.each(function(index, node) {
                    var $curSlide = $(node);

                    var newLeft =
                        $curSlide.data("left-percent") -
                        $curSlide.data("width-percent");
                    $curSlide.data("left-percent", newLeft);

                    $curSlide.animate(
                        {
                            left: newLeft + "%"
                        },
                        1000,
                        function() {
                            if ($curSlide.data("left-percent") < 0) {
                                var leftPercent =
                                    (slidesCount - 1) *
                                    $curSlide.data("width-percent");
                                $curSlide.css("left", leftPercent + "%");
                                $curSlide.data("left-percent", leftPercent);
                            }
                        }
                    );
                });
            }, 3000);
        }
    });
}

Slider3__init();


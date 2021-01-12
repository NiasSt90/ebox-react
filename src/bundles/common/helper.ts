import {ArtistImageSizes, EBoxVote} from "../../hooks/types";

export const readableTime = (seconds: number): string => {
    seconds = Math.floor(seconds);
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (hours !== 0) {
        return hours.toString().padStart(2, '0') + "h:" +
            minutes.toString().padStart(2, '0') + ":" +
            seconds.toString().padStart(2, '0');
    }
    return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}

export const mapArtistImageSizes = (size: ArtistImageSizes): string => {
    switch (size) {
        case "mega":return "1000x1000";
        case "extralarge":return "500x500";
        case "large":return "250x250";
        case "small":return "56x56";
    }
}

export const mapEBoxVoteToNumber = (vote: EBoxVote): number => {
    switch (vote) {
        case "canceled":return 0;
        case "bad":return 1;
        case "neutral":return 3;
        case "good":return 5;
    }
}
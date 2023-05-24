package hac.beans;

public class MovieItem {
    private String movieName;
    private int movieId;

    public MovieItem(String movieName, int movieId) {
        this.movieName = movieName;
        this.movieId = movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public int getMovieId() {
        return movieId;
    }
}

package hac.beans;

public class MovieItem {
    private String movieName;
    private int movieId;
    private String posterPath;

    private String overview;
    private String releaseDate;

    public MovieItem(String movieName, int movieId,String posterPath, String overview,String releaseDate ) {
        this.movieName = movieName;
        this.movieId = movieId;
        this.posterPath = posterPath;
        this.overview = overview;
        this.releaseDate = releaseDate;
    }
    public String getMovieName() {
        return movieName;
    }

    public int getMovieId() {
        return movieId;
    }
    public String getPosterPath() {
        return posterPath;
    }
    public String getOverview() {
        return overview;
    }
    public String getReleaseDate() {
        return releaseDate;
    }
}

package hac.beans;

/**
 The MovieItem class represents a movie item.
 It contains information such as the movie name, ID, poster path, overview, and release date.
 */
public class MovieItem {
    private String movieName;
    private int movieId;
    private String posterPath;
    private String overview;
    private String releaseDate;

    /**
     Constructs a MovieItem object with the specified movie details.
     @param movieName The name of the movie.
     @param movieId The ID of the movie.
     @param posterPath The path to the movie's poster.
     @param overview The overview or description of the movie.
     @param releaseDate The release date of the movie.
     */
    public MovieItem(String movieName, int movieId, String posterPath, String overview, String releaseDate) {
        this.movieName = movieName;
        this.movieId = movieId;
        this.posterPath = posterPath;
        this.overview = overview;
        this.releaseDate = releaseDate;
    }
    /**
     Returns the name of the movie.
     @return The name of the movie.
     */
    public String getMovieName() {
        return movieName;
    }
    /**
     Returns the ID of the movie.
     @return The ID of the movie.
     */
    public int getMovieId() {
        return movieId;
    }
    /**
     Returns the path to the movie's poster.
     @return The path to the movie's poster.
     */
    public String getPosterPath() {
        return posterPath;
    }
    /**
     Returns the overview or description of the movie.
     @return The overview or description of the movie.
     */
    public String getOverview() {
        return overview;
    }
    /**
     Returns the release date of the movie.
     @return The release date of the movie.
     */
    public String getReleaseDate() {
        return releaseDate;
    }
}

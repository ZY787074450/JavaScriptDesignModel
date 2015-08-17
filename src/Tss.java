import java.util.ArrayList;
import java.util.List;


public class Tss {

	
	public static void main(String[] args) {

		String str = "";
		String str2 = str;
		
		str ="ddd";
		int in = 0;
		
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < 5; i++) {
			in = in+1;
			str2 = "ss"+i+in;
			list.add(str2);
		}
		
		System.out.println(list);
	}
}

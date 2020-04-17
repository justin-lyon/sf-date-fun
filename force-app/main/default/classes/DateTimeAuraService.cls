public with sharing class DateTimeAuraService {
	@AuraEnabled
	public static List<Long> getEpochTimes () {
		// Generate a bunch of Epoch Times to goof around with
		List<Long> times = new List<Long>();
		for (Integer i = 0; i < 10; i++) {
			times.add(Datetime.now().addDays(i).getTime());
		}
		return times;
	}

	@AuraEnabled
	public static Long getEpochTime () {
		// DateTime.now() gives an Apex DateTime in GMT Timezone
		// .getTime() converts that value to EpochTime
		// EpochTime is the duration in milliseconds from Jan 1, 1970
		return DateTime.now().getTime();
	}

	@AuraEnabled
	public static String echoDateTime (Long epochTime) {
		// echo back the DateTime String
		return String.valueOf(DateTime.newInstance(epochTime));
	}
}

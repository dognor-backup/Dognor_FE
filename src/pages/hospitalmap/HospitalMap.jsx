import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DnPagination } from "@/shared/components/DnPagination";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import DogPin from "../../assets/icons/map/pin.svg?react";
import MyPin from "../../assets/icons/map/pin2.svg?react";
import SearchIcon from "../../assets/icons/white/magnifying_glass_w.svg?react";
import VerifiedIcon from "../../assets/icons/subicon/verified_mint.svg?react";
import EmptyStar from "../../assets/icons/primary/star_primary.svg?react";
import FilledStar from "../../assets/icons/primary/star_filled_primary.svg?react";
import { Button } from "@/shared/components/buttons/Button";
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "@/shared/utils/axiosInstance";

const fetchRegisteredHospitals = async ({
  text = "",
  x,
  y,
  radius = 2000,
  page = 1,
  size = 20,
}) => {
  try {
    const response = await AxiosInstance.post("/hospital/search-map", {
      text,
      x,
      y,
      radius,
      page,
      size,
    });

    if (response.data.code === 200) {
      return {
        success: true,
        data: response.data.data,
        totalCount: response.data.totalCount || 0,
      };
    } else {
      return {
        success: false,
        msg: response.data.msg || "데이터를 불러오지 못했습니다.",
        data: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: "네트워크 오류. 연결 상태를 확인해주세요.",
      data: [],
    };
  }
};

const useKakaoLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY ||
      "0a3a2185ccbb6c5c6647e8a1604f823b"
    }&autoload=false&libraries=services,clusterer`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return isLoaded;
};

const HospitalMap = () => {
  const isKakaoLoaded = useKakaoLoader();
  const [keyword, setKeyword] = useState("");
  const [registeredPage, setRegisteredPage] = useState(1);
  const [registeredSize] = useState(5);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [visibleNearbyHospitals, setVisibleNearbyHospitals] = useState([]);
  const [currentNearbyPage, setCurrentNearbyPage] = useState(1);
  const [totalNearbyPage, setTotalNearbyPage] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [center, setCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [mapInstance, setMapInstance] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState({});
  const [donationFilterActive, setDonationFilterActive] = useState(false);
  const [kakaoApiPagination, setKakaoApiPagination] = useState(null);
  const registeredItemsPerPage = 5;
  const nearbyItemsPerPage = 15;

  const { data: registeredHospitalData, refetch: refetchRegisteredHospitals } =
    useQuery({
      queryKey: [
        "registeredHospitals",
        center.lng,
        center.lat,
        registeredPage,
        registeredSize,
        keyword,
      ],
      queryFn: () =>
        fetchRegisteredHospitals({
          text: keyword,
          x: center.lng.toString(),
          y: center.lat.toString(),
          page: registeredPage,
          size: registeredSize,
        }),
      enabled: isKakaoLoaded && !!center.lat && !!center.lng,
      keepPreviousData: true,
    });

  const registeredHospitals = registeredHospitalData?.success
    ? registeredHospitalData.data
    : [];

  const filteredRegisteredHospitals = donationFilterActive
    ? registeredHospitals.filter((hospital) => hospital.donationYn === 1)
    : registeredHospitals;

  const totalRegisteredPage = donationFilterActive
    ? Math.ceil(filteredRegisteredHospitals.length / registeredItemsPerPage)
    : registeredHospitalData?.totalCount
    ? Math.ceil(registeredHospitalData.totalCount / registeredSize)
    : 1;

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setUserLocation({
            lat,
            lng,
          });

          setCenter({
            lat,
            lng,
          });

          if (isKakaoLoaded) {
            searchNearbyHospitals(lat, lng);
          }
        },
        (error) => {
          if (isKakaoLoaded) {
            searchNearbyHospitals(center.lat, center.lng);
          }
        }
      );
    } else if (isKakaoLoaded) {
      searchNearbyHospitals(center.lat, center.lng);
    }
  };

  const searchNearbyHospitals = (lat, lng, page = 1) => {
    if (!isKakaoLoaded) return;

    const places = new window.kakao.maps.services.Places();

    const callback = function (result, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        const hospitals = result.filter(
          (place) =>
            place.category_name &&
            (place.category_name.includes("병원") ||
              place.place_name.includes("병원"))
        );

        if (page === 1) {
          setNearbyHospitals(hospitals);
        } else {
          setNearbyHospitals((prev) => [...prev, ...hospitals]);
        }

        setKakaoApiPagination(pagination);
        setTotalNearbyPage(pagination.last);
        setCurrentNearbyPage(pagination.current);

        if (mapInstance) {
          filterVisibleHospitals(hospitals, mapInstance);
        } else {
          setVisibleNearbyHospitals(hospitals);
        }
      }
    };

    places.keywordSearch("동물병원", callback, {
      location: new window.kakao.maps.LatLng(lat, lng),
      radius: 5000,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
      page: page,
    });
  };

  const loadNextPage = () => {
    if (kakaoApiPagination && kakaoApiPagination.hasNext) {
      kakaoApiPagination.nextPage();
    }
  };

  const loadPrevPage = () => {
    if (kakaoApiPagination && kakaoApiPagination.hasPrev) {
      kakaoApiPagination.prevPage();
    }
  };

  const filterVisibleHospitals = (hospitals, map) => {
    if (!map) return;

    const bounds = map.getBounds();

    if (bounds) {
      const filtered = hospitals.filter((hospital) => {
        const position = new window.kakao.maps.LatLng(
          parseFloat(hospital.y),
          parseFloat(hospital.x)
        );
        return bounds.contain(position);
      });

      setVisibleNearbyHospitals(filtered);
    } else {
      setVisibleNearbyHospitals(hospitals);
    }
  };

  const searchByKeyword = () => {
    if (!isKakaoLoaded || !keyword.trim()) return;

    const places = new window.kakao.maps.services.Places();

    const callback = function (result, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        const hospitals = result.filter(
          (place) =>
            place.category_name &&
            (place.category_name.includes("병원") ||
              place.place_name.includes("병원"))
        );

        setNearbyHospitals(hospitals);
        setKakaoApiPagination(pagination);
        setTotalNearbyPage(pagination.last);
        setCurrentNearbyPage(pagination.current);

        if (mapInstance) {
          filterVisibleHospitals(hospitals, mapInstance);
        } else {
          setVisibleNearbyHospitals(hospitals);
        }

        if (hospitals.length > 0) {
          setCenter({
            lat: parseFloat(hospitals[0].y),
            lng: parseFloat(hospitals[0].x),
          });
        }
      }
    };

    const searchKeyword = keyword.includes("병원")
      ? keyword
      : `${keyword} 병원`;
    places.keywordSearch(searchKeyword, callback);

    refetchRegisteredHospitals();
  };

  const selectHospital = (hospital) => {
    setSelectedHospital(hospital);

    const lat = parseFloat(hospital.y || hospital.lat || hospital.y);
    const lng = parseFloat(hospital.x || hospital.lng || hospital.x);

    setCenter({
      lat,
      lng,
    });

    const id = hospital.hospitalInfoSeq || hospital.id || hospital.place_name;
    setInfoWindowVisible({
      [id]: true,
    });
  };

  const toggleInfoWindow = (hospital) => {
    const id = hospital.hospitalInfoSeq || hospital.id || hospital.place_name;
    setInfoWindowVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRegisteredPageChange = (pageNumber) => {
    let newPage = pageNumber;

    if (pageNumber === "prev" && registeredPage > 1) {
      newPage = registeredPage - 1;
    } else if (pageNumber === "next" && registeredPage < totalRegisteredPage) {
      newPage = registeredPage + 1;
    } else if (typeof pageNumber === "number") {
      newPage = pageNumber;
    } else {
      return;
    }

    setRegisteredPage(newPage);
  };

  const handleNearbyPageChange = (pageNumber) => {
    if (pageNumber === "prev") {
      loadPrevPage();
    } else if (pageNumber === "next") {
      loadNextPage();
    } else if (typeof pageNumber === "number" && kakaoApiPagination) {
      kakaoApiPagination.gotoPage(pageNumber);
    }
  };

  const handleCenterChanged = (map) => {
    setMapInstance(map);

    const bounds = map.getBounds();
    if (bounds && nearbyHospitals.length > 0) {
      filterVisibleHospitals(nearbyHospitals, map);
    }

    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };

    const threshold = 0.01;
    const distanceLat = Math.abs(newCenter.lat - center.lat);
    const distanceLng = Math.abs(newCenter.lng - center.lng);

    if (distanceLat > threshold || distanceLng > threshold) {
      setCenter(newCenter);
      searchNearbyHospitals(newCenter.lat, newCenter.lng);
      refetchRegisteredHospitals();
    }
  };

  const openKakaoMap = (hospital) => {
    if (hospital && hospital.place_url) {
      window.open(hospital.place_url, "_blank");
    }
  };

  const toggleDonationFilter = () => {
    setDonationFilterActive(!donationFilterActive);
    setRegisteredPage(1);
  };

  useEffect(() => {
    if (isKakaoLoaded) {
      getCurrentLocation();
    }
  }, [isKakaoLoaded]);

  useEffect(() => {
    if (mapInstance && nearbyHospitals.length > 0) {
      filterVisibleHospitals(nearbyHospitals, mapInstance);
    }
  }, [mapInstance, nearbyHospitals]);

  const paginatedRegisteredHospitals = donationFilterActive
    ? filteredRegisteredHospitals.slice(
        (registeredPage - 1) * registeredItemsPerPage,
        registeredPage * registeredItemsPerPage
      )
    : filteredRegisteredHospitals;

  const paginatedNearbyHospitals = visibleNearbyHospitals.slice(
    0,
    nearbyItemsPerPage
  );

  const renderStarRating = (rating) => {
    const filledStars = Math.round(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<FilledStar key={i} width={16} height={16} />);
      } else {
        stars.push(<EmptyStar key={i} width={16} height={16} />);
      }
    }

    return stars;
  };

  return (
    <HospitalMapLayout>
      <SidebarContainer>
        <SidebarHeader>
          병원소식
          <SearchContainer>
            <Flex>
              <Input
                type="text"
                placeholder="지역, 주소, 병원 상호명을 입력해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    searchByKeyword();
                  }
                }}
              />
              <Button
                variant="normal"
                size="normal"
                state="default"
                onClick={searchByKeyword}
              >
                <SearchIcon />
              </Button>
            </Flex>
          </SearchContainer>
        </SidebarHeader>

        <RegisteredHospitalHeader>
          *헌혈하개 회원 동물병원
        </RegisteredHospitalHeader>

        <FilterButtonContainer>
          <Button
            variant="normal"
            size="small"
            state={donationFilterActive ? "default" : "outline"}
            onClick={toggleDonationFilter}
          >
            헌혈가능
          </Button>
        </FilterButtonContainer>

        <ListContainer>
          {filteredRegisteredHospitals.length > 0 ? (
            <>
              <HospitalList>
                {paginatedRegisteredHospitals.map((hospital) => (
                  <HospitalItemRegistered
                    key={hospital.hospitalInfoSeq}
                    onClick={() => selectHospital(hospital)}
                    isSelected={
                      selectedHospital &&
                      selectedHospital.hospitalInfoSeq ===
                        hospital.hospitalInfoSeq
                    }
                  >
                    <HospitalItemContent>
                      <HospitalInfo>
                        <HospitalNameRow>
                          <VerifiedWrapper>
                            <VerifiedIcon width={16} height={16} />
                          </VerifiedWrapper>
                          <HospitalName>{hospital.hospitalName}</HospitalName>
                          {hospital.donationYn === 1 && (
                            <DonationBadge>헌혈 가능</DonationBadge>
                          )}
                        </HospitalNameRow>
                        <RatingContainer>
                          <RatingNumber>
                            {hospital.starRating.toFixed(1)}
                          </RatingNumber>
                          {renderStarRating(hospital.starRating)}
                        </RatingContainer>
                        <HospitalAddress>
                          {hospital.address} {hospital.addressDetail}
                        </HospitalAddress>
                        <HospitalPhone>{hospital.phone}</HospitalPhone>
                      </HospitalInfo>
                      {hospital.mainImgUrl && (
                        <HospitalImage
                          src={hospital.mainImgUrl}
                          alt={hospital.hospitalName}
                        />
                      )}
                    </HospitalItemContent>
                  </HospitalItemRegistered>
                ))}
              </HospitalList>
              <PaginationContainer>
                <DnPagination
                  totalPage={totalRegisteredPage}
                  getClickedPageNumber={handleRegisteredPageChange}
                />
              </PaginationContainer>
            </>
          ) : (
            <NoDataContainer>
              <NoDataText>근처에 회원 동물병원이 없습니다.</NoDataText>
            </NoDataContainer>
          )}
        </ListContainer>

        <NearbyHospitalHeader>주변 동물병원</NearbyHospitalHeader>

        <ListContainer>
          {paginatedNearbyHospitals.length > 0 ? (
            <>
              <HospitalList>
                {paginatedNearbyHospitals.map((hospital, index) => (
                  <HospitalItem
                    key={index}
                    onClick={() => selectHospital(hospital)}
                    isSelected={
                      selectedHospital &&
                      selectedHospital.place_name === hospital.place_name
                    }
                  >
                    <HospitalItemContent>
                      <HospitalInfo>
                        <HospitalName>{hospital.place_name}</HospitalName>
                        <HospitalAddress>
                          {hospital.address_name || hospital.road_address_name}
                        </HospitalAddress>
                        <HospitalPhone>{hospital.phone || ""}</HospitalPhone>
                      </HospitalInfo>
                      <ButtonWrapper>
                        <Button
                          variant="normal"
                          size="small"
                          state="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            openKakaoMap(hospital);
                          }}
                        >
                          찾아가기
                        </Button>
                      </ButtonWrapper>
                    </HospitalItemContent>
                  </HospitalItem>
                ))}
              </HospitalList>
              <PaginationContainer>
                <DnPagination
                  totalPage={totalNearbyPage}
                  getClickedPageNumber={handleNearbyPageChange}
                />
              </PaginationContainer>
            </>
          ) : (
            <NoDataContainer>
              <NoDataText>조건에 맞는 병원이 없습니다.</NoDataText>
            </NoDataContainer>
          )}
        </ListContainer>
      </SidebarContainer>

      <MapContainer>
        {isKakaoLoaded && (
          <Map
            center={center}
            style={{ width: "100%", height: "100%" }}
            level={5}
            onCenterChanged={handleCenterChanged}
            onCreate={setMapInstance}
          >
            {userLocation && (
              <CustomOverlayMap
                position={userLocation}
                yAnchor={1.0}
                xAnchor={0.5}
              >
                <MyPinWrapper>
                  <MyPin width={50} height={50} />
                </MyPinWrapper>
              </CustomOverlayMap>
            )}

            {nearbyHospitals.map((hospital, index) => (
              <React.Fragment key={`marker-${index}`}>
                <CustomOverlayMap
                  position={{
                    lat: parseFloat(hospital.y),
                    lng: parseFloat(hospital.x),
                  }}
                  yAnchor={1.0}
                  xAnchor={0.5}
                  onClick={() => toggleInfoWindow(hospital)}
                >
                  <DogPinWrapper>
                    <DogPin width={30} height={30} />
                  </DogPinWrapper>
                </CustomOverlayMap>

                {infoWindowVisible[hospital.place_name] && (
                  <CustomOverlayMap
                    position={{
                      lat: parseFloat(hospital.y),
                      lng: parseFloat(hospital.x),
                    }}
                    yAnchor={2.1}
                    xAnchor={0.5}
                  >
                    <InfoWindow>
                      <InfoTitle>{hospital.place_name}</InfoTitle>
                      <InfoAddress>
                        {hospital.address_name || hospital.road_address_name}
                      </InfoAddress>
                      {hospital.phone && (
                        <InfoPhone>전화: {hospital.phone}</InfoPhone>
                      )}
                    </InfoWindow>
                  </CustomOverlayMap>
                )}
              </React.Fragment>
            ))}

            {filteredRegisteredHospitals.map((hospital, index) => (
              <React.Fragment key={`registered-${index}`}>
                <CustomOverlayMap
                  position={{
                    lat: parseFloat(hospital.y),
                    lng: parseFloat(hospital.x),
                  }}
                  yAnchor={1.0}
                  xAnchor={0.5}
                  onClick={() => toggleInfoWindow(hospital)}
                >
                  <DogPinWrapper>
                    <DogPin width={40} height={40} fill="#FF6B6B" />
                  </DogPinWrapper>
                </CustomOverlayMap>

                {infoWindowVisible[hospital.hospitalInfoSeq] && (
                  <CustomOverlayMap
                    position={{
                      lat: parseFloat(hospital.y),
                      lng: parseFloat(hospital.x),
                    }}
                    yAnchor={2.1}
                    xAnchor={0.5}
                  >
                    <InfoWindow>
                      <InfoTitle>{hospital.hospitalName}</InfoTitle>
                      <InfoAddress>
                        {hospital.address} {hospital.addressDetail}
                      </InfoAddress>
                      {hospital.phone && (
                        <InfoPhone>전화: {hospital.phone}</InfoPhone>
                      )}
                    </InfoWindow>
                  </CustomOverlayMap>
                )}
              </React.Fragment>
            ))}
          </Map>
        )}
      </MapContainer>
    </HospitalMapLayout>
  );
};

const HospitalMapLayout = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 130px);
  margin-top: 130px;
`;

const SidebarContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.h2`
  padding: 16px;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  height: 42px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  border-radius: 6px;
  font-size: 14px;
  outline: none;
`;

const RegisteredHospitalHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary_blue};
  color: ${({ theme }) => theme.colors.neutrals_08};
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding: 40px 16px 16px 16px;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 16px;
`;

const NearbyHospitalHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.neutrals_06};
  color: ${({ theme }) => theme.colors.neutrals_00};
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding: 40px 16px 16px 16px;
`;

const ListContainer = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NoDataContainer = styled.div`
  height: 140px;
  gap: 8px;
  padding: 0 16px;
`;

const NoDataText = styled.div`
  height: 140px;
  gap: 8px;
  padding: 60px 8px 60px 8px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  color: #170f49;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
`;

const HospitalList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HospitalItem = styled.li`
  padding: 16px 8px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.neutrals_08};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  width: 380px;
`;

const HospitalItemRegistered = styled(HospitalItem)`
  overflow: hidden;
`;

const HospitalItemContent = styled.div`
  display: flex;
  width: 100%;
`;

const HospitalInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HospitalImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 12px;
  align-self: flex-end;
`;

const HospitalNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VerifiedWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HospitalName = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const DonationBadge = styled.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 4px;
  font-weight: 500;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const RatingNumber = styled.span`
  color: ${({ theme }) => theme.colors.primary_purple};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0%;
  margin-right: 4px;
`;

const HospitalAddress = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const HospitalPhone = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const MapContainer = styled.div`
  flex: 1;
  height: 100%;
  min-height: 500px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`;

const DogPinWrapper = styled.div`
  cursor: pointer;
`;

const MyPinWrapper = styled.div`
  cursor: default;
`;

const InfoWindow = styled.div`
  border-radius: 5px;
  padding: 10px;
  min-width: 120px;
  max-width: 200px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top: 8px solid white;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`;

const InfoTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
`;

const InfoAddress = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
`;

const InfoPhone = styled.p`
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #3396f4;
`;

export default HospitalMap;
